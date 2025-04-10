import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IStudent extends IUser {
  dateOfBirth: Date;
  nationality: string;
  currentEducation: {
    institution: string;
    level: string;
    field: string;
    grade: string;
  };
  interests: string[];
  testScores: {
    type: string;
    score: number;
    date: Date;
  }[];
  savedUniversities: mongoose.Types.ObjectId[];
  applications: {
    university: mongoose.Types.ObjectId;
    status: 'draft' | 'submitted' | 'accepted' | 'rejected';
    submittedAt?: Date;
    documents: {
      type: string;
      url: string;
      uploadedAt: Date;
    }[];
  }[];
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  preferredCountries: string[];
  preferredPrograms: string[];
  preferredLanguages: string[];
}

const studentSchema = new Schema<IStudent>(
  {
    dateOfBirth: {
      type: Date,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    currentEducation: {
      institution: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        required: true,
      },
      field: {
        type: String,
        required: true,
      },
      grade: {
        type: String,
        required: true,
      },
    },
    interests: [{
      type: String,
      trim: true,
    }],
    testScores: [{
      type: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    }],
    savedUniversities: [{
      type: Schema.Types.ObjectId,
      ref: 'University',
    }],
    applications: [{
      university: {
        type: Schema.Types.ObjectId,
        ref: 'University',
        required: true,
      },
      status: {
        type: String,
        enum: ['draft', 'submitted', 'accepted', 'rejected'],
        default: 'draft',
      },
      submittedAt: Date,
      documents: [{
        type: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      }],
    }],
    budget: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
        default: 'USD',
      },
    },
    preferredCountries: [{
      type: String,
      trim: true,
    }],
    preferredPrograms: [{
      type: String,
      trim: true,
    }],
    preferredLanguages: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

// Ensure the role is always 'student'
studentSchema.pre('save', function(next) {
  this.role = 'student';
  next();
});

export const Student = mongoose.model<IStudent>('Student', studentSchema); 