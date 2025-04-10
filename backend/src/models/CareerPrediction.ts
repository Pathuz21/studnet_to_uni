import mongoose, { Schema, Document } from 'mongoose';

export interface ICareerPrediction extends Document {
  userId: Schema.Types.ObjectId;
  academicScores: {
    gpa: number;
    sat?: number;
    act?: number;
  };
  interests: string[];
  careerGoals: string;
  extracurriculars: string[];
  predictions: {
    universities: Array<{
      name: string;
      matchPercentage: number;
      ranking: number;
      programs: string[];
    }>;
    careers: Array<{
      title: string;
      demand: number;
      salary: number;
      growth: number;
    }>;
    insights: Array<{
      type: 'university' | 'career' | 'skill';
      content: string;
      confidence: number;
    }>;
  };
  feedback?: {
    helpful: boolean;
    comments?: string;
    timestamp: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const careerPredictionSchema = new Schema<ICareerPrediction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    academicScores: {
      gpa: {
        type: Number,
        required: true,
        min: 0,
        max: 4.0,
      },
      sat: {
        type: Number,
        min: 400,
        max: 1600,
      },
      act: {
        type: Number,
        min: 1,
        max: 36,
      },
    },
    interests: [{
      type: String,
      required: true,
    }],
    careerGoals: {
      type: String,
      required: true,
    },
    extracurriculars: [{
      type: String,
      required: true,
    }],
    predictions: {
      universities: [{
        name: String,
        matchPercentage: Number,
        ranking: Number,
        programs: [String],
      }],
      careers: [{
        title: String,
        demand: Number,
        salary: Number,
        growth: Number,
      }],
      insights: [{
        type: {
          type: String,
          enum: ['university', 'career', 'skill'],
        },
        content: String,
        confidence: Number,
      }],
    },
    feedback: {
      helpful: Boolean,
      comments: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICareerPrediction>('CareerPrediction', careerPredictionSchema); 