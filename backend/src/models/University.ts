import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IUniversity extends IUser {
  institutionType: 'public' | 'private' | 'international';
  foundedYear: number;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  website: string;
  description: string;
  ranking: {
    global?: number;
    national?: number;
    year: number;
  };
  accreditation: string[];
  faculties: {
    name: string;
    description: string;
    departments: string[];
  }[];
  programs: {
    name: string;
    level: 'bachelor' | 'master' | 'phd';
    duration: string;
    description: string;
    requirements: string[];
    tuitionFee: {
      amount: number;
      currency: string;
      period: 'per_year' | 'per_semester' | 'total';
    };
    startDates: Date[];
    applicationDeadline: Date;
    language: string;
    availableSeats: number;
  }[];
  facilities: {
    name: string;
    description: string;
    images: string[];
  }[];
  scholarships: {
    name: string;
    description: string;
    amount: {
      value: number;
      currency: string;
    };
    type: 'merit' | 'need' | 'sports' | 'research';
    requirements: string[];
    deadline: Date;
  }[];
  events: {
    title: string;
    description: string;
    date: Date;
    type: 'open_day' | 'webinar' | 'workshop' | 'other';
    registrationLink?: string;
  }[];
  statistics: {
    totalStudents: number;
    internationalStudents: number;
    facultyCount: number;
    studentToFacultyRatio: number;
  };
  socialMedia: {
    platform: string;
    url: string;
  }[];
  virtualTour: {
    type: '360' | '3d' | 'video';
    url: string;
    description: string;
  }[];
  reviews: {
    student: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    date: Date;
  }[];
  averageRating: number;
}

const universitySchema = new Schema<IUniversity>(
  {
    institutionType: {
      type: String,
      enum: ['public', 'private', 'international'],
      required: true,
    },
    foundedYear: {
      type: Number,
      required: true,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      coordinates: {
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
    },
    website: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ranking: {
      global: Number,
      national: Number,
      year: {
        type: Number,
        required: true,
      },
    },
    accreditation: [{
      type: String,
      trim: true,
    }],
    faculties: [{
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      departments: [{
        type: String,
        trim: true,
      }],
    }],
    programs: [{
      name: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ['bachelor', 'master', 'phd'],
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      requirements: [{
        type: String,
        trim: true,
      }],
      tuitionFee: {
        amount: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          required: true,
          default: 'USD',
        },
        period: {
          type: String,
          enum: ['per_year', 'per_semester', 'total'],
          required: true,
        },
      },
      startDates: [{
        type: Date,
        required: true,
      }],
      applicationDeadline: {
        type: Date,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      availableSeats: {
        type: Number,
        required: true,
      },
    }],
    facilities: [{
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      images: [{
        type: String,
        required: true,
      }],
    }],
    scholarships: [{
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      amount: {
        value: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          required: true,
          default: 'USD',
        },
      },
      type: {
        type: String,
        enum: ['merit', 'need', 'sports', 'research'],
        required: true,
      },
      requirements: [{
        type: String,
        trim: true,
      }],
      deadline: {
        type: Date,
        required: true,
      },
    }],
    events: [{
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      type: {
        type: String,
        enum: ['open_day', 'webinar', 'workshop', 'other'],
        required: true,
      },
      registrationLink: String,
    }],
    statistics: {
      totalStudents: {
        type: Number,
        required: true,
      },
      internationalStudents: {
        type: Number,
        required: true,
      },
      facultyCount: {
        type: Number,
        required: true,
      },
      studentToFacultyRatio: {
        type: Number,
        required: true,
      },
    },
    socialMedia: [{
      platform: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    }],
    virtualTour: [{
      type: {
        type: String,
        enum: ['360', '3d', 'video'],
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    }],
    reviews: [{
      student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }],
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure the role is always 'university'
universitySchema.pre('save', function(next) {
  this.role = 'university';
  next();
});

// Calculate average rating before saving
universitySchema.pre('save', function(next) {
  if (this.reviews && this.reviews.length > 0) {
    this.averageRating = this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length;
  }
  next();
});

export const University = mongoose.model<IUniversity>('University', universitySchema); 