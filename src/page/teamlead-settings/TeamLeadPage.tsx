import React, { useState } from "react";
import "./TeamLeadPageStyles.css";
import { observer } from "mobx-react-lite";
import { tokenStore } from "./TeamLeadStore";

const TeamLeadSettingsPage: React.FC = observer(() => {
    const [showTokenField, setShowTokenField] = useState(false);

    const handleCreateToken = async () => {
        await tokenStore.fetchToken();
        setShowTokenField(true);
    };

    const handleCopyToken = () => {
        if (tokenStore.token) {
            navigator.clipboard.writeText(tokenStore.token);
        }
    };

    return (
        <div className="container">
            <div className="team-lead-settings-page">
                <h1>Team Lead Settings</h1>

                <button className="create-token-button" onClick={handleCreateToken} disabled={tokenStore.loading}>
                    {tokenStore.loading ? "Generating..." : "Create Invite Token"}
                </button>

                {showTokenField && tokenStore.token && (
                    <div className="invite-token-container">
                        <textarea className="invite-token-textarea" value={tokenStore.token} readOnly />
                        <button className="copy-token-button" onClick={handleCopyToken}>
                            Copy Token
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
});

export default TeamLeadSettingsPage;
