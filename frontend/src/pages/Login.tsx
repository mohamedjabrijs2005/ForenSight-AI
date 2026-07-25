import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import { Loader2, Mail, Lock } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [serverError, setServerError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoggingIn(true);
    setServerError('');
    
    // Simulate API call for Mock Auth
    setTimeout(() => {
      let role = null;
      let name = '';
      
      if (data.password === 'password123') {
        if (data.email === 'admin@forensight.ai') {
          role = 'Super Admin';
          name = 'Chief Inspector';
        } else if (data.email === 'officer@forensight.ai') {
          role = 'Police Officer';
          name = 'Officer Martinez';
        } else if (data.email === 'analyst@forensight.ai') {
          role = 'Crime Analyst';
          name = 'Analyst Chen';
        }
      }

      if (role) {
        const mockToken = 'mock_jwt_token_header.payload.signature';
        login(mockToken, {
          id: 'usr_' + Math.floor(Math.random() * 1000),
          name: name,
          email: data.email,
          role: role as any,
        });
        navigate('/dashboard');
      } else {
        setServerError('Invalid email or password. Hint: admin | officer | analyst @forensight.ai / password123');
        setIsLoggingIn(false);
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl">
          {serverError}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5">
          Email address
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            {...register('email')}
            type="email"
            className="block w-full pl-11 pr-3 py-3 sm:text-sm border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground transition-all placeholder:text-muted-foreground hover:bg-muted/30"
            placeholder="admin | officer | analyst @forensight.ai"
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-sm text-destructive font-medium">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5">
          Password
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            {...register('password')}
            type="password"
            className="block w-full pl-11 pr-3 py-3 sm:text-sm border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground transition-all placeholder:text-muted-foreground hover:bg-muted/30"
            placeholder="••••••••"
          />
        </div>
        {errors.password && (
          <p className="mt-1.5 text-sm text-destructive font-medium">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground font-medium cursor-pointer">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-semibold text-primary hover:text-primary/80 transition-colors">
            Forgot password?
          </a>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_2px_10px_rgba(26,115,232,0.3)] text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        >
          {isLoggingIn ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            'Sign in to Command Center'
          )}
        </button>
      </div>
    </form>
  );
}
