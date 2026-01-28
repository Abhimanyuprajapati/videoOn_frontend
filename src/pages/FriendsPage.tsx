import { UsersIcon } from "lucide-react";
import React from "react";

export const FriendsPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Friends
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="size-16 rounded-full bg-base-300 flex items-center justify-center mb-4">
          <UsersIcon className="size-8 text-base-content opacity-40" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Working On</h3>
        <p className="text-base-content opacity-70 max-w-md">
          Work in Progress.
        </p>
      </div>
    </div>
  );
};
