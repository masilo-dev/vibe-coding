import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AlphaClone Systems API is running' });
});

app.get('/api/info', (req, res) => {
  res.json({
    name: 'AlphaClone Systems',
    version: '1.0.0',
    description: 'A fullstack vibe coding app'
  });
});

app.post('/api/code/execute', (req, res) => {
  const { code, language } = req.body;
  
  // Placeholder for code execution functionality
  res.json({
    success: true,
    message: 'Code execution endpoint (to be implemented)',
    input: { code, language }
  });
});

app.post('/api/code/analyze', (req, res) => {
  const { code } = req.body;
  
  // Placeholder for code analysis functionality
  res.json({
    success: true,
    message: 'Code analysis endpoint (to be implemented)',
    input: { code }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`AlphaClone Systems API server running on port ${PORT}`);
});
