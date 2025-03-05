import { ClassroomEnum } from "@/constants/class-enum";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

/**
 * customer hook to get role and class name of the user
 * @returns status, role, classroom
 */
export const useMetadata = () => {

  const { isSignedIn, user, isLoaded } = useUser()
  const [status, setStatus] = useState<'loading' | 'unAuthenticated' | 'authenticated'>('loading');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [classroom, setClassName] = useState<ClassroomEnum>();

  useEffect(() => {
    if (!isLoaded) {
      setStatus('loading');
    } else if (!isSignedIn) {
      setStatus('unAuthenticated');
    }
    else if (!user.unsafeMetadata.role || !user.unsafeMetadata.classroom) {
      setStatus('unAuthenticated');
    }
    else {
      setStatus('authenticated');
      setRole(user.unsafeMetadata.role as 'student' | 'teacher');
      setClassName(user.unsafeMetadata.classroom as ClassroomEnum);
    }

  }, [isSignedIn, isLoaded, user]);
  return { status, role, classroom };
}