import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up">
            Privacy Policy for Bouncing Ball Chaos
          </h1>
          <p className="text-sm text-muted-foreground">
            <strong>Effective Date: October 15, 2025</strong>
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Thank you for playing Bouncing Ball Chaos (&quot;the game,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a mobile offline game developed by PCC Free Space. We are committed to protecting your privacy. This game is completely free, contains no advertisements, and does not collect any of your personal data. This Privacy Policy explains our commitment to your privacy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Information We Collect</h2>
          <p className="text-muted-foreground">
            <strong>We do not collect any personal information.</strong> Bouncing Ball Chaos is an offline game. We do not collect, store, or have access to any personal or sensitive user data, such as your name, email address, location, or device identifiers.
          </p>
          <p className="text-muted-foreground">
            The only data the game uses is related to your gameplay progress, such as high scores or settings. This information is stored **locally on your device only** and is never transmitted to us or any third party.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. How We Use Your Information</h2>
          <p className="text-muted-foreground">
            The gameplay data stored on your device is used solely to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Save your progress so you can continue playing where you left off.</li>
            <li>Keep track of your high scores and game settings.</li>
            <li>Enhance your personal gaming experience.</li>
          </ul>
          <p className="text-muted-foreground">
            We do not use your data for advertising, profiling, or any other purpose.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Data Sharing and Third Parties</h2>
          <p className="text-muted-foreground">
            We do not share, sell, or disclose any data because we do not collect any. All game data remains on your device. The game operates entirely offline and does not communicate with any external servers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Data Security</h2>
          <p className="text-muted-foreground">
            We take reasonable measures to ensure the integrity of the game&apos;s code to protect the data stored locally on your device. Since the data never leaves your device, you have full control over it.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Your Choices and Rights</h2>
          <p className="text-muted-foreground">
            You have complete control over your game data. You can delete all locally stored game data at any time by clearing the application&apos;s cache and data through your device&apos;s settings or by simply uninstalling the game.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Children&apos;s Privacy</h2>
          <p className="text-muted-foreground">
            Our game does not knowingly collect any personal information from anyone, including children under the age of 13. The game is designed to be safe for all audiences.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">7. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions or concerns regarding this Privacy Policy, please contact us at:<br />
            <a href="mailto:pccfreespace@gmail.com" className="text-primary hover:underline">pccfreespace@gmail.com</a>
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">8. Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. Since the game is offline and does not collect data, we anticipate that any changes will be minor. We encourage you to review this policy periodically.
          </p>
        </div>

      </div>
    </div>
  );
}