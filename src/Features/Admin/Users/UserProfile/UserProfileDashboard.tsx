import { useEffect, useState } from "react";
import MainContent from "../../Structural/MainContent/MainContent";
import Navbar from "../../Structural/Navbar/Navbar";
import Sidebar from "../../Structural/Sidebar/Sidebar";
import { getUser } from "@/Services/user/userService";
import type { User } from "@/Services/user/user.types";
import CollapsibleContainer from "@/Features/Components/CollapsibleContainer/CollapsibleContainer";
import {
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import UpdateGeneralForm from "./UpdateGeneralForm";
import UpdateContactInfoForm from "./UpdateContactInfoForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { getStoredUserId } from "@/Utils/getUser";

export default function UserProfileDashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(getStoredUserId());
        setUser(data);
      } catch(e) {
        console.error("Failed to load user profile!", e);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
      <Navbar />
        <MainContent>
          {user && (
            <div className="space-y-8">
              {/* Header Row */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Profile
                </h2>
              </div>

              {/* General Section */}
              <CollapsibleContainer
                headerText="General"
                icon={<UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
              >
                <UpdateGeneralForm user={user} />
              </CollapsibleContainer>

              {/* Password Section */}
              <CollapsibleContainer
                headerText="Password and Security"
                icon={<LockClosedIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
              >
                <UpdatePasswordForm />
              </CollapsibleContainer>

              {/* Contact Info Section */}
              <CollapsibleContainer
                headerText="Contact Information"
                icon={<EnvelopeIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
              >
                <UpdateContactInfoForm user={user} />
              </CollapsibleContainer>
            </div>
          )}
        </MainContent>
      </div>
    </div>
  );
}
