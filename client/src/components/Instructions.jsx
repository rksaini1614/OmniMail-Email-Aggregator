const instructions = [
    "Create an account with OmniMail.",
    "Login to your account.",
    "Go to Dashboard > Settings.",
    "Type the email you want to link.",
    "Click on the Link button and provide Google consent.",
    "Go to Dashboard > Inbox and click on the Refresh button.",
    "Now, you will see all mails from your linked email accounts."
];

const Instructions = () => {
    return (
        <div className="flex justify-center items-center px-4 py-8">
            <div className="bg-white border border-gray-300 rounded-2xl shadow-xl w-full sm:max-w-2xl p-6">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
                    Getting Started with OmniMail
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-gray-800">
                    {instructions.map((step, index) => (
                        <li key={index} className="leading-relaxed">
                            {step}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Instructions;
