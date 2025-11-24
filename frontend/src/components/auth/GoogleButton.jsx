import { motion } from "framer-motion";

export default function GoogleButton({ onClick, label = "Continue with Google" }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/90 px-4 py-3 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-white"
    >
      <GoogleIcon />
      <span>{label}</span>
    </motion.button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.766 12.276c0-.815-.073-1.604-.209-2.365H12.24v4.48h6.48a5.54 5.54 0 01-2.403 3.632v3.02h3.89c2.276-2.096 3.559-5.186 3.559-8.767z" fill="#4285F4"/>
      <path d="M12.24 24c3.24 0 5.956-1.073 7.94-2.913l-3.89-3.02c-1.073.72-2.45 1.147-4.05 1.147-3.115 0-5.755-2.103-6.697-4.948H1.52v3.115A11.997 11.997 0 0012.24 24z" fill="#34A853"/>
      <path d="M5.543 14.266a7.19 7.19 0 010-4.532V6.62H1.52a12.01 12.01 0 000 10.76l4.023-3.115z" fill="#FBBC05"/>
      <path d="M12.24 4.75c1.76 0 3.344.606 4.59 1.792l3.433-3.433C18.192 1.328 15.476 0 12.24 0 7.52 0 3.435 2.697 1.52 6.62l4.023 3.115c.958-2.845 3.598-4.948 6.697-4.948z" fill="#EA4335"/>
    </svg>
  );
}
