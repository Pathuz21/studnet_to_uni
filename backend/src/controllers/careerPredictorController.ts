import { Request, Response } from 'express';
import CareerPrediction from '../models/CareerPrediction';
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate career predictions
export const generatePredictions = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { academicScores, interests, careerGoals, extracurriculars } = req.body;

    // Generate AI insights using OpenAI
    const prompt = `Based on the following student profile, provide career and university recommendations:
    GPA: ${academicScores.gpa}
    SAT: ${academicScores.sat || 'Not provided'}
    ACT: ${academicScores.act || 'Not provided'}
    Interests: ${interests.join(', ')}
    Career Goals: ${careerGoals}
    Extracurriculars: ${extracurriculars.join(', ')}
    
    Please provide:
    1. Top 3 university matches with match percentages and relevant programs
    2. Top 3 career options with demand, salary, and growth rate
    3. 3 personalized insights about university fit, career alignment, and skill development`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a career and university advisor helping students find their best matches."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Parse AI response and create structured predictions
    const aiResponse = completion.choices[0].message.content;
    const predictions = parseAIResponse(aiResponse || '');

    // Create prediction record
    const prediction = new CareerPrediction({
      userId: req.user._id,
      academicScores,
      interests,
      careerGoals,
      extracurriculars,
      predictions,
    });

    await prediction.save();
    res.status(201).json(predictions);
  } catch (error) {
    console.error('Error generating predictions:', error);
    res.status(500).json({ message: 'Error generating predictions', error });
  }
};

// Get user's prediction history
export const getPredictionHistory = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const predictions = await CareerPrediction.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prediction history', error });
  }
};

// Submit feedback for predictions
export const submitFeedback = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { predictionId, helpful, comments } = req.body;

    const prediction = await CareerPrediction.findOne({
      _id: predictionId,
      userId: req.user._id,
    });

    if (!prediction) {
      return res.status(404).json({ message: 'Prediction not found' });
    }

    prediction.feedback = {
      helpful,
      comments,
      timestamp: new Date(),
    };

    await prediction.save();
    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};

// Helper function to parse AI response
function parseAIResponse(response: string) {
  // This is a simplified example. In a real application, you would need more robust parsing
  const universities = [
    {
      name: 'Stanford University',
      matchPercentage: 92,
      ranking: 1,
      programs: ['Computer Science', 'Engineering', 'Business'],
    },
    {
      name: 'MIT',
      matchPercentage: 88,
      ranking: 2,
      programs: ['Engineering', 'Computer Science', 'Mathematics'],
    },
    {
      name: 'Harvard University',
      matchPercentage: 85,
      ranking: 3,
      programs: ['Business', 'Law', 'Medicine'],
    },
  ];

  const careers = [
    {
      title: 'Software Engineer',
      demand: 85,
      salary: 120000,
      growth: 25,
    },
    {
      title: 'Data Scientist',
      demand: 90,
      salary: 130000,
      growth: 35,
    },
    {
      title: 'Product Manager',
      demand: 80,
      salary: 140000,
      growth: 20,
    },
  ];

  const insights = [
    {
      type: 'university',
      content: 'Your profile matches 92% with Stanford University',
      confidence: 0.92,
    },
    {
      type: 'career',
      content: 'Your interests align well with software engineering',
      confidence: 0.85,
    },
    {
      type: 'skill',
      content: 'Consider developing your leadership skills through student government',
      confidence: 0.78,
    },
  ];

  return {
    universities,
    careers,
    insights,
  };
} 