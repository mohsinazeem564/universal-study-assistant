# Contributing to Universal Study Assistant

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/mohsinazeem564/universal-study-assistant/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, app version)

### Suggesting Features

1. Check existing [Issues](https://github.com/mohsinazeem564/universal-study-assistant/issues) for similar suggestions
2. Create a new issue with:
   - Clear feature description
   - Use cases and benefits
   - Possible implementation approach

### Code Contributions

#### Setup Development Environment

1. **Fork the repository**
```bash
git clone https://github.com/YOUR_USERNAME/universal-study-assistant.git
cd universal-study-assistant
```

2. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Mobile
cd ../mobile
npm install
```

3. **Set up environment variables**
```bash
# Copy example files
cp backend/.env.example backend/.env
cp mobile/.env.example mobile/.env

# Edit with your API keys
```

4. **Run development servers**
```bash
# Backend
cd backend
npm run dev

# Mobile (in another terminal)
cd mobile
npm start
npx react-native run-android  # or run-ios
```

#### Making Changes

1. **Create a branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

2. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**
   - Test on both Android and iOS (for mobile changes)
   - Test API endpoints (for backend changes)
   - Ensure no breaking changes

4. **Commit your changes**
```bash
git add .
git commit -m "feat: add new feature description"
# or
git commit -m "fix: resolve bug description"
```

Use conventional commit messages:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

5. **Push and create Pull Request**
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear description of changes
- Link to related issues
- Screenshots/videos if UI changes

## Code Style Guidelines

### JavaScript/TypeScript

- Use TypeScript for type safety
- Use functional components with hooks
- Follow ESLint rules
- Use meaningful variable names
- Add JSDoc comments for functions

```typescript
/**
 * Solves a problem using AI
 * @param problem - The problem text
 * @param subject - Subject category
 * @returns Solution object with explanation
 */
async function solveProblem(problem: string, subject: string): Promise<Solution> {
  // Implementation
}
```

### React Native

- Use functional components
- Extract reusable components
- Use React Native Paper components
- Follow Material Design guidelines
- Optimize for performance

### Backend

- Use async/await for async operations
- Handle errors properly
- Add input validation
- Use meaningful HTTP status codes
- Add API documentation comments

## Adding New Subjects

To add a new subject category:

1. Edit `backend/src/config/subjects.js`
2. Add your category and subjects:

```javascript
NewCategory: {
  SubjectName: {
    topics: [
      'Topic 1',
      'Topic 2',
      // ...
    ]
  }
}
```

3. Update mobile app subject categories in `HomeScreen.tsx`

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Mobile Tests
```bash
cd mobile
npm test
```

## Documentation

- Update README.md for major changes
- Add JSDoc comments for new functions
- Update API documentation
- Add inline comments for complex logic

## Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

## Questions?

- Open a [Discussion](https://github.com/mohsinazeem564/universal-study-assistant/discussions)
- Join our community chat
- Email: mohsinazeem564@gmail.com

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in the app

Thank you for making education accessible to everyone! 🎓
