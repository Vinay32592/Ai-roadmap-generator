import mongoose, { Schema, Document } from 'mongoose';

export interface IStep extends Document {
  title: string;
  description: string;
  duration: string;
  milestone: string;
  completed: boolean;
  notes?: string;
}

const stepSchema = new Schema<IStep>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  milestone: { type: String, required: true },
  completed: { type: Boolean, default: false },
  notes: { type: String },
});

export interface IRoadmap extends Document {
  goal: string;
  steps: IStep[];
  userId: string;
  createdAt: Date;
  status: 'Draft' | 'In Progress' | 'Completed';
}

const roadmapSchema = new Schema<IRoadmap>({
  goal: { type: String, required: true },
  steps: [stepSchema],
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Draft', 'In Progress', 'Completed'], default: 'Draft' },
});

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  avatar: string;
  signature?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  avatar: { type: String },
  signature: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Roadmap = mongoose.model<IRoadmap>('Roadmap', roadmapSchema);
export const User = mongoose.model<IUser>('User', userSchema);
export const Step = mongoose.model<IStep>('Step', stepSchema);
