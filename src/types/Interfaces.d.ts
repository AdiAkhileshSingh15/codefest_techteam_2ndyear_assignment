interface HomeProps {}

interface LoginProps {}

interface SignupProps {}

interface AddWorkoutProps {
    setNumOfWorkouts: React.Dispatch<React.SetStateAction<number>>;
}

interface LoginFormProps {}

interface SignupFormProps {}

interface NavbarProps {}

interface WorkoutCardProps {
    workout: Workout;
    setNumOfWorkouts: React.Dispatch<React.SetStateAction<number>>;
}

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    logout: () => void;
    editingId: string;
    setEditingId: React.Dispatch<React.SetStateAction<string>>;
    successToast: (message: string | null) => void;
    errorToast: (message: string | null) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface ButtonProps {
    text: string;
    onclick: () => void;
}

export {HomeProps, LoginProps, SignupProps, AddWorkoutProps, NavbarProps, LoginFormProps, SignupFormProps, WorkoutCardProps, AuthContextType, AuthProviderProps, ButtonProps}
