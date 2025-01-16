import React, { useState } from "react";
import "./TeamLeadPageStyles.css";

const TeamLeadSettingsPage: React.FC = () => {
    const [inviteToken, setInviteToken] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState<string | null>(null);

    const handleCreateToken = () => {
        const generatedToken = "INVITE-TOKEN-12345";
        setInviteToken(generatedToken);
        setCopySuccess(null);
    };

    const handleCopyToken = () => {
        if (inviteToken) {
            navigator.clipboard.writeText(inviteToken).then(() => {
                setCopySuccess("Token copied successfully!");
                setTimeout(() => setCopySuccess(null), 3000);
            });
        }
    };

    return (
        <div className="container">
        <div className="team-lead-settings-page">
            <h1>Team Lead Settings</h1>

            <button className="create-token-button" onClick={handleCreateToken}>
                Create Invite Token
            </button>

            {inviteToken && (
                <div className="invite-token-container">
                    <textarea
                        className="invite-token-textarea"
                        value={inviteToken}
                        readOnly
                    />
                    <div className="copy-container">
                        <button className="copy-token-button" onClick={handleCopyToken}>
                            Copy Token
                        </button>
                        {copySuccess && <span className="copy-success-message">{copySuccess}</span>}
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default TeamLeadSettingsPage;
