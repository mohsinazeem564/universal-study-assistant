import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Text,
  Searchbar,
  Card,
  Chip,
  FAB,
  Portal,
  Modal,
} from 'react-native-paper';
import { AdBanner } from '../components/AdBanner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const SUBJECT_CATEGORIES = [
  { id: 'STEM', icon: 'flask', color: '#2196F3', subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'] },
  { id: 'Engineering', icon: 'cog', color: '#FF9800', subjects: ['Civil', 'Mechanical', 'Electrical', 'Chemical'] },
  { id: 'Languages', icon: 'translate', color: '#4CAF50', subjects: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic', 'Urdu'] },
  { id: 'Social Sciences', icon: 'earth', color: '#9C27B0', subjects: ['History', 'Geography', 'Economics', 'Psychology', 'Sociology'] },
  { id: 'Professional', icon: 'briefcase', color: '#F44336', subjects: ['Medicine', 'Law', 'Business', 'Nursing', 'Pharmacy'] },
  { id: 'Arts', icon: 'palette', color: '#E91E63', subjects: ['Music', 'Visual Arts', 'Performing Arts'] },
  { id: 'Applied', icon: 'leaf', color: '#8BC34A', subjects: ['Agriculture', 'Environmental Science', 'Architecture', 'Education'] },
];

export const HomeScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleSubjectPress = (subject: string) => {
    setModalVisible(false);
    navigation.navigate('ProblemSolver', { subject });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Universal Study Assistant</Text>
          <Text style={styles.subtitle}>
            AI-powered solutions for every subject 🎓
          </Text>
        </View>

        {/* Search Bar */}
        <Searchbar
          placeholder="Search subjects or topics..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          onSubmitEditing={() => {
            if (searchQuery) {
              navigation.navigate('Search', { query: searchQuery });
            }
          }}
        />

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>200+</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1000+</Text>
            <Text style={styles.statLabel}>Topics</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>∞</Text>
            <Text style={styles.statLabel}>Solutions</Text>
          </View>
        </View>

        {/* Subject Categories */}
        <Text style={styles.sectionTitle}>Subject Categories</Text>
        <View style={styles.categoriesGrid}>
          {SUBJECT_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => handleCategoryPress(category)}
            >
              <Icon name={category.icon} size={40} color="#fff" />
              <Text style={styles.categoryTitle}>{category.id}</Text>
              <Text style={styles.categoryCount}>
                {category.subjects.length} subjects
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Topics */}
        <Text style={styles.sectionTitle}>Popular Topics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Calculus', 'Organic Chemistry', 'Physics Mechanics', 'Programming', 'Grammar', 'World History'].map((topic) => (
            <Chip
              key={topic}
              style={styles.topicChip}
              onPress={() => navigation.navigate('ProblemSolver', { topic })}
            >
              {topic}
            </Chip>
          ))}
        </ScrollView>

        {/* Features */}
        <Text style={styles.sectionTitle}>Features</Text>
        <Card style={styles.featureCard}>
          <Card.Content>
            <View style={styles.featureRow}>
              <Icon name="brain" size={24} color="#2196F3" />
              <Text style={styles.featureText}>AI-Powered Solutions</Text>
            </View>
            <View style={styles.featureRow}>
              <Icon name="chart-line" size={24} color="#4CAF50" />
              <Text style={styles.featureText}>Visual Diagrams & Charts</Text>
            </View>
            <View style={styles.featureRow}>
              <Icon name="lightbulb-on" size={24} color="#FF9800" />
              <Text style={styles.featureText}>Simple Explanations</Text>
            </View>
            <View style={styles.featureRow}>
              <Icon name="translate" size={24} color="#9C27B0" />
              <Text style={styles.featureText}>Multi-Language Support</Text>
            </View>
          </Card.Content>
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Ad Banner */}
      <AdBanner />

      {/* FAB */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('ProblemSolver')}
        label="Solve Problem"
      />

      {/* Subject Selection Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>
            {selectedCategory?.id}
          </Text>
          <ScrollView>
            {selectedCategory?.subjects.map((subject) => (
              <TouchableOpacity
                key={subject}
                style={styles.subjectItem}
                onPress={() => handleSubjectPress(subject)}
              >
                <Text style={styles.subjectText}>{subject}</Text>
                <Icon name="chevron-right" size={24} color="#666" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      </Portal>
    </View>
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
  header: {
    padding: 20,
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  searchBar: {
    margin: 16,
    elevation: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  categoryCard: {
    width: (width - 48) / 2,
    margin: 8,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9,
  },
  topicChip: {
    marginHorizontal: 4,
    marginBottom: 16,
  },
  featureCard: {
    margin: 16,
    elevation: 2,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 80,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subjectText: {
    fontSize: 16,
  },
});
