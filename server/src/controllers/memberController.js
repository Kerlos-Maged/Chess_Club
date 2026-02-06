import { MemberApplication } from '../models/MemberApplication.js';
import { memberApplicationSchema } from '../validators/schemas.js';

export const submitApplication = async (req, res, next) => {
  try {
    const validatedData = memberApplicationSchema.parse(req.body);
    const application = new MemberApplication(validatedData);
    await application.save();
    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllApplications = async (req, res, next) => {
  try {
    const applications = await MemberApplication.find().sort({
      createdAt: -1,
    });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const application = await MemberApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
};
