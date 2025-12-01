import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.select({
      ios: process.env.ADMOB_INTERSTITIAL_ID_IOS,
      android: process.env.ADMOB_INTERSTITIAL_ID_ANDROID,
    });

class InterstitialAdManager {
  private interstitial: InterstitialAd | null = null;
  private loaded = false;
  private showCount = 0;
  private readonly SHOW_AFTER_PROBLEMS = 3; // Show ad after every 3 problems

  constructor() {
    this.loadAd();
  }

  private loadAd() {
    this.interstitial = InterstitialAd.createForAdRequest(adUnitId!, {
      requestNonPersonalizedAdsOnly: false,
    });

    this.interstitial.addAdEventListener(AdEventType.LOADED, () => {
      this.loaded = true;
      console.log('Interstitial ad loaded');
    });

    this.interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      this.loaded = false;
      this.loadAd(); // Load next ad
    });

    this.interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error('Interstitial ad error:', error);
      this.loaded = false;
      // Retry loading after 30 seconds
      setTimeout(() => this.loadAd(), 30000);
    });

    this.interstitial.load();
  }

  public async showAd(): Promise<void> {
    this.showCount++;

    // Show ad after every N problems
    if (this.showCount % this.SHOW_AFTER_PROBLEMS !== 0) {
      return;
    }

    if (this.loaded && this.interstitial) {
      try {
        await this.interstitial.show();
      } catch (error) {
        console.error('Failed to show interstitial ad:', error);
      }
    }
  }

  public resetCount() {
    this.showCount = 0;
  }
}

export const adManager = new InterstitialAdManager();

export const useInterstitialAd = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAdReady = setInterval(() => {
      setIsReady(adManager['loaded']);
    }, 1000);

    return () => clearInterval(checkAdReady);
  }, []);

  return {
    showAd: () => adManager.showAd(),
    isReady,
  };
};
