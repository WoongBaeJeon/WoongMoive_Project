import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "@supabase_path";
import { useInputValidation } from "@hooks";

export const useSignUp = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { validateSignUp, isValid } = useInputValidation();
  const supabaseAuth = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSignUp = async (form) => {
    const newErrors = validateSignUp(form);
    setErrors(newErrors);

    if (!isValid(newErrors)) {
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabaseAuth.signUp({
        email: form.email,
        password: form.password,
        display_name: form.name,
        options: { data: {} },
      });
      if (error) throw error;

      toast.success(`회원가입 성공!`);
      navigate("/login");
    } catch (error) {
      toast.error(`회원가입 실패 : ${error.message}`);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { handleSignUp, errors, loading };
};
