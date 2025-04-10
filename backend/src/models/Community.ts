import mongoose, { Schema, Document } from 'mongoose';

export interface ICommunityPost extends Document {
  title: string;
  content: string;
  author: {
    id: Schema.Types.ObjectId;
    name: string;
    avatar: string;
    role: 'student' | 'alumni' | 'university';
  };
  category: string;
  replies: number;
  views: number;
  lastReply: {
    author: string;
    date: Date;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const communityPostSchema = new Schema<ICommunityPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['student', 'alumni', 'university'],
        required: true,
      },
    },
    category: {
      type: String,
      enum: ['general', 'admissions', 'scholarships', 'campus-life'],
      required: true,
    },
    replies: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    lastReply: {
      author: {
        type: String,
        default: '',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
    tags: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICommunityPost>('CommunityPost', communityPostSchema); 