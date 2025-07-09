import { useEffect, useState } from "react";
import axios from "axios";
import { emailApis } from "../services/apis";
import Loader from "../components/common/Spinner";
import { ArrowUpAzIcon, ArrowUpIcon, MailOpen, RefreshCwIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const lastEmailCount = useRef(0);
    const intervalSet = useRef(false);
    const navigate = useNavigate();

    const fetchInbox = async (options = { notify: true }) => {
        setLoading(true); 
        try {
            const res = await axios.get(emailApis.FETCH_GMAIL_INBOX_API, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            

            if (res.data.success) {
                const newEmails = res.data.messages;

                //Compare with previous state
                // Use functional update to get latest previous state
                if (options.notify && newEmails.length > lastEmailCount.current) {
                    toast.success(`${newEmails.length - emails.length} new email(s) received`);
                }

                setEmails(newEmails);
                lastEmailCount.current = newEmails.length;
            } else {
                toast.error(res.data.message || "Failed to fetch emails.");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message;

            if (err.response?.status === 404) {
                toast("No Gmail accounts linked yet. Go to settings and connect one.");
            } else {
                toast.error(errorMessage || "Error in fetching emails");
            }
            console.error(err);
        } finally {
            setLoading(false); 
        }
    };

    const markAsRead = async (email) => {
        try {
            await axios.post(
            emailApis.MARK_EMAIL_AS_READ_API,
            {
                messageId: email.id,
                email: email.email,
            },
            {
                withCredentials: true,
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        // Remove email from inbox view
        setEmails((prev) => prev.filter((e) => e.id !== email.id));
        } catch (err) {
            console.error("Error marking email as read:", err.message);
        }
    };

    // On modal open
    const handleOpenModal = (email) => {
        setSelectedEmail(email);
        setShowModal(true);
        markAsRead(email);
    };

    const handleRefresh = async() => {
        await fetchInbox({ notify: false });
    }

    useEffect(() => {
        fetchInbox({ notify: false });

        if (!intervalSet.current) {
            const intervalId = setInterval(() => fetchInbox({ notify: true }), 60000);
            intervalSet.current = true;

            return () => {
                clearInterval(intervalId);
                intervalSet.current = false;
            };
        }
    }, []);


    if (loading) return <Loader message="Please wait while fetching your new emails"/>;

    return (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto relative">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-700 text-center w-full">📥 My Inbox</h2>
            <button
                onClick={handleRefresh}
                className=" flex items-center gap-1 ml-4 text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold px-4 py-2 
                rounded shadow transition duration-200 cursor-pointer"
            >
                <RefreshCwIcon/>
                Refresh
            </button>
        </div>

        {emails.length === 0 ? (
            <div className="flex flex-col items-center text-gray-500">
                <p className="mt-30 mr-20">No unread emails found.</p>
            </div>
        ) : (
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
                {emails.map((email, index) => (
                    <div
                    key={index}
                    onClick={() => (handleOpenModal(email))}
                    className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                    >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-indigo-600 truncate">{email.from}</p>
                        <p className="text-xs text-gray-400">{new Date(+email.internalDate).toLocaleDateString()}</p>
                    </div>
                    <h3 className="text-md font-bold text-gray-800 truncate">{email.subject || "(No Subject)"}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">{email.snippet}</p>
                    <p className="mt-3 text-xs text-gray-400">Sent via: {email.email}</p>
                    </div>
                ))}
            </div>
            {
                emails.length > 20 && (
                    <div className="flex items-center justify-center mt-8">
                        <button className="flex items-center gap-1 justify-center bg-blue-500 text-white px-4 py-3 hover:bg-blue-700 rounded-md
                        transition-all duration-200 cursor-pointer"
                        onClick={() => {navigate("/dashboard/inbox");scrollTo(0,0)}}>
                            Go to Top
                            <ArrowUpIcon/>
                        </button>
                    </div>
                )
            }
            </div>
        )}

        {/* Email Modal */}
        {showModal && selectedEmail && (
            <div className="fixed inset-0 z-50 backdrop-blur  flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{selectedEmail.subject || "No Subject"}</h3>
                <button
                    onClick={() => (setShowModal(false))}
                    className="text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer"
                >
                    ×
                </button>
                </div>
                <p className="text-sm text-gray-600 mb-2"><b>From:</b> {selectedEmail.from}</p>
                <p className="text-sm text-gray-600 mb-4"><b>Date:</b> {new Date(+selectedEmail.internalDate).toLocaleString()}</p>
                <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: selectedEmail.body }}/>
            </div>
            </div>
        )}
        </div>
    );
};

export default Inbox;
