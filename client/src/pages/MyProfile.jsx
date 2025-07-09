import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/common/Spinner";

const MyProfile = () => {
  const {
    user,
    getUserProfile,
    removeLinkedEmail,
    deleteUserAccount,
  } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      await getUserProfile();
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <Loader />;

  if (!user) {
    return <div className="text-center text-gray-700 text-lg">User Not Found</div>;
  }

  const removeHandler = async (email) => {
    const confirmed = window.confirm(`Remove ${email}?`);
    if (confirmed) {
      await removeLinkedEmail(email);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <img
            src={user?.profile_image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {user.otherEmails?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2 text-gray-800">
              Linked Email Accounts:
            </h3>
            <ul className="space-y-3 text-gray-700">
              {user.otherEmails.map((email, index) => (
                <li
                  key={index}
                  className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-gray-50 px-4 py-3 rounded-md border"
                >
                  <div className="flex items-center gap-2 text-sm md:text-base">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{email}</span>
                  </div>
                  <button
                    onClick={() => removeHandler(email)}
                    className="mt-2 md:mt-0 bg-blue-600 text-white py-1.5 px-4 text-sm rounded-md 
                    hover:bg-blue-800 transition cursor-pointer"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white mt-6 p-6 md:p-8 rounded-lg shadow-md border border-red-300">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
        <p className="text-gray-600 mb-4 text-sm md:text-base">
          Deleting your account will remove all data, including linked emails. This action cannot be undone.
        </p>
        <button
          onClick={deleteUserAccount}
          className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition 
          text-sm md:text-base cursor-pointer"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
