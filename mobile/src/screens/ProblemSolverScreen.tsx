import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Chip,
  ActivityIndicator,
  Portal,
  Dialog,
  RadioButton,
} from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import Markdown from 'react-native-markdown-display';
import { AdBanner } from '../components/AdBanner';
import { adManager } from '../components/InterstitialAdManager';
import { solveProblem } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ProblemSolverScreen = ({ route, navigation }: any) => {
  const { subject: initialSubject, topic: initialTopic } = route.params || {};

  const [problem, setProblem] = useState('');
  const [subject, setSubject] = useState(initialSubject || '');
  const [topic, setTopic] = useState(initialTopic || '');
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<any>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showDifficultyDialog, setShowDifficultyDialog] = useState(false);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0]) {
      setImageUri(result.assets[0].uri || null);
    }
  };

  const handleSolve = async () => {
    if (!problem.trim() || !subject.trim()) {
      alert('Please enter a problem and select a subject');
      return;
    }

    setLoading(true);
    setSolution(null);

    try {
      const response = await solveProblem({
        problem,
        subject,
        topic,
        difficulty,
        imageUrl: imageUri,
      });

      setSolution(response);

      // Show interstitial ad after solving
      await adManager.showAd();

    } catch (error) {
      console.error('Problem solving error:', error);
      alert('Failed to solve problem. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setProblem('');
    setSolution(null);
    setImageUri(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.scrollView}>
        {/* Input Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>Subject *</Text>
            <TextInput
              mode="outlined"
              value={subject}
              onChangeText={setSubject}
              placeholder="e.g., Mathematics, Physics, Chemistry"
              style={styles.input}
            />

            <Text style={styles.label}>Topic (Optional)</Text>
            <TextInput
              mode="outlined"
              value={topic}
              onChangeText={setTopic}
              placeholder="e.g., Calculus, Mechanics, Organic Chemistry"
              style={styles.input}
            />

            <Text style={styles.label}>Problem *</Text>
            <TextInput
              mode="outlined"
              value={problem}
              onChangeText={setProblem}
              placeholder="Enter your problem here..."
              multiline
              numberOfLines={6}
              style={styles.problemInput}
            />

            {/* Image Upload */}
            {imageUri && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <Button
                  mode="text"
                  onPress={() => setImageUri(null)}
                  icon="close"
                >
                  Remove
                </Button>
              </View>
            )}

            <View style={styles.buttonRow}>
              <Button
                mode="outlined"
                onPress={handleImagePick}
                icon="camera"
                style={styles.button}
              >
                Add Image
              </Button>
              <Button
                mode="outlined"
                onPress={() => setShowDifficultyDialog(true)}
                icon="tune"
                style={styles.button}
              >
                {difficulty}
              </Button>
            </View>

            <Button
              mode="contained"
              onPress={handleSolve}
              loading={loading}
              disabled={loading || !problem.trim() || !subject.trim()}
              icon="brain"
              style={styles.solveButton}
            >
              Solve Problem
            </Button>

            {solution && (
              <Button
                mode="text"
                onPress={handleClear}
                icon="refresh"
                style={styles.clearButton}
              >
                Clear & Start New
              </Button>
            )}
          </Card.Content>
        </Card>

        {/* Solution Section */}
        {loading && (
          <Card style={styles.card}>
            <Card.Content style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>
                AI is analyzing your problem...
              </Text>
            </Card.Content>
          </Card>
        )}

        {solution && (
          <>
            {/* Main Solution */}
            <Card style={styles.card}>
              <Card.Title
                title="Solution"
                left={(props) => <Icon {...props} name="check-circle" size={24} color="#4CAF50" />}
              />
              <Card.Content>
                <Markdown style={markdownStyles}>
                  {solution.solution}
                </Markdown>
              </Card.Content>
            </Card>

            {/* Simple Explanation */}
            {solution.explanation && difficulty === 'easy' && (
              <Card style={styles.card}>
                <Card.Title
                  title="Simple Explanation"
                  left={(props) => <Icon {...props} name="lightbulb-on" size={24} color="#FF9800" />}
                />
                <Card.Content>
                  <Markdown style={markdownStyles}>
                    {solution.explanation}
                  </Markdown>
                </Card.Content>
              </Card>
            )}

            {/* Steps */}
            {solution.steps && solution.steps.length > 0 && (
              <Card style={styles.card}>
                <Card.Title
                  title="Step-by-Step"
                  left={(props) => <Icon {...props} name="format-list-numbered" size={24} color="#2196F3" />}
                />
                <Card.Content>
                  {solution.steps.map((step: string, index: number) => (
                    <View key={index} style={styles.stepContainer}>
                      <Text style={styles.stepNumber}>{index + 1}</Text>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </Card.Content>
              </Card>
            )}

            {/* Diagram */}
            {solution.diagram && (
              <Card style={styles.card}>
                <Card.Title
                  title="Visual Diagram"
                  left={(props) => <Icon {...props} name="chart-line" size={24} color="#9C27B0" />}
                />
                <Card.Content>
                  {solution.diagram.url && (
                    <Image
                      source={{ uri: solution.diagram.url }}
                      style={styles.diagram}
                      resizeMode="contain"
                    />
                  )}
                </Card.Content>
              </Card>
            )}

            {/* Keywords */}
            {solution.keywords && solution.keywords.length > 0 && (
              <Card style={styles.card}>
                <Card.Title title="Key Concepts" />
                <Card.Content>
                  <View style={styles.keywordsContainer}>
                    {solution.keywords.map((keyword: string, index: number) => (
                      <Chip key={index} style={styles.keyword}>
                        {keyword}
                      </Chip>
                    ))}
                  </View>
                </Card.Content>
              </Card>
            )}
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Ad Banner */}
      <AdBanner />

      {/* Difficulty Dialog */}
      <Portal>
        <Dialog
          visible={showDifficultyDialog}
          onDismiss={() => setShowDifficultyDialog(false)}
        >
          <Dialog.Title>Select Difficulty</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={value => setDifficulty(value)}
              value={difficulty}
            >
              <RadioButton.Item label="Easy (Simple Explanation)" value="easy" />
              <RadioButton.Item label="Medium (Standard)" value="medium" />
              <RadioButton.Item label="Hard (Advanced)" value="hard" />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDifficultyDialog(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  problemInput: {
    marginBottom: 16,
    minHeight: 120,
  },
  imageContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  solveButton: {
    paddingVertical: 8,
  },
  clearButton: {
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginRight: 12,
    minWidth: 24,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  diagram: {
    width: '100%',
    height: 300,
    marginVertical: 16,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keyword: {
    margin: 4,
  },
});

const markdownStyles = {
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  code_inline: {
    backgroundColor: '#f5f5f5',
    padding: 4,
    borderRadius: 4,
    fontFamily: 'monospace',
  },
  code_block: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontFamily: 'monospace',
  },
};
