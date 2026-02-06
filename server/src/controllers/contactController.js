import { ContactMessage } from '../models/ContactMessage.js';
import { contactMessageSchema } from '../validators/schemas.js';

export const submitContactMessage = async (req, res, next) => {
  try {
    const validatedData = contactMessageSchema.parse(req.body);
    const message = new ContactMessage(validatedData);
    await message.save();
    res.status(201).json({
      message: 'Message sent successfully',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({
      createdAt: -1,
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    next(error);
  }
};
