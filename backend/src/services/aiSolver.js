const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class AISolver {
  async solveProblem(problem, subject, topic, difficulty = 'medium') {
    try {
      const systemPrompt = this.buildSystemPrompt(subject, topic, difficulty);
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: problem }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const solution = response.choices[0].message.content;
      
      return {
        solution,
        explanation: await this.generateSimpleExplanation(solution, difficulty),
        steps: this.extractSteps(solution),
        needsDiagram: this.checkIfNeedsDiagram(subject, topic),
        keywords: this.extractKeywords(solution)
      };
    } catch (error) {
      console.error('AI Solver Error:', error);
      throw new Error('Failed to generate solution');
    }
  }

  buildSystemPrompt(subject, topic, difficulty) {
    const difficultyMap = {
      easy: 'Explain like I\'m 5 years old. Use very simple language and everyday examples.',
      medium: 'Explain clearly with step-by-step reasoning. Use appropriate terminology but keep it accessible.',
      hard: 'Provide detailed technical explanation with advanced concepts and thorough analysis.'
    };

    return `You are an expert ${subject} teacher specializing in ${topic}.

Your task is to solve problems and explain them in a way that EVERYONE can understand.

Difficulty Level: ${difficulty}
Explanation Style: ${difficultyMap[difficulty]}

Guidelines:
1. Break down the problem into clear steps
2. Use analogies and real-world examples
3. Explain WHY each step is necessary
4. Highlight common mistakes to avoid
5. Provide visual descriptions where helpful
6. Use simple language - avoid jargon unless necessary
7. Make it engaging and easy to follow

Format your response with:
- Clear problem statement
- Step-by-step solution
- Final answer
- Key concepts explained
- Practice tips`;
  }

  async generateSimpleExplanation(solution, difficulty) {
    if (difficulty === 'easy') {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You explain complex topics to 5-year-olds using simple words and fun examples.'
          },
          {
            role: 'user',
            content: `Explain this in the simplest way possible:\n\n${solution}`
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      });
      
      return response.choices[0].message.content;
    }
    
    return solution;
  }

  extractSteps(solution) {
    const stepRegex = /(?:Step \d+|^\d+\.|^-)/gm;
    const lines = solution.split('\n');
    const steps = [];
    
    lines.forEach(line => {
      if (stepRegex.test(line)) {
        steps.push(line.trim());
      }
    });
    
    return steps.length > 0 ? steps : [solution];
  }

  checkIfNeedsDiagram(subject, topic) {
    const visualSubjects = [
      'Mathematics', 'Physics', 'Chemistry', 'Biology',
      'Engineering', 'Architecture', 'Geography', 'Geometry'
    ];
    
    return visualSubjects.some(s => subject.includes(s));
  }

  extractKeywords(text) {
    const words = text.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const frequency = {};
    
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }

  async generatePracticeProblems(subject, topic, count = 3) {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Generate ${count} practice problems for ${subject} - ${topic}. Make them progressively harder.`
        },
        {
          role: 'user',
          content: 'Generate practice problems with varying difficulty levels.'
        }
      ],
      temperature: 0.9,
      max_tokens: 1000
    });
    
    return response.choices[0].message.content;
  }
}

module.exports = new AISolver();
