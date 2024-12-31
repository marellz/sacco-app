import bcrypt from 'bcryptjs';

const hash = async (password) => {
    await bcrypt.hash(password, 10);
}

export default hash;