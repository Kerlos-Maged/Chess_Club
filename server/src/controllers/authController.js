import { Admin } from '../models/Admin.js';
import { generateToken } from '../utils/helpers.js';
import { loginSchema } from '../validators/schemas.js';

export const adminLogin = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const admin = await Admin.findOne({ email: validatedData.email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await admin.comparePassword(
      validatedData.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(admin._id);
    res.json({
      message: 'Login successful',
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });
  } catch (error) {
    next(error);
  }
};
