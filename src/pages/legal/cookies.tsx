import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cookie, Shield, Settings, AlertTriangle, Check, X } from "lucide-react";
import Link from "next/link";

type CookieType = {
  name: string;
  provider: string;
  purpose: string;
  expiry: string;
  type: 'necessary' | 'preferences' | 'analytics' | 'marketing';
};

const cookieTypes: { [key: string]: { name: string; description: string } } = {
  necessary: {
    name: 'Strictly Necessary',
    description: 'These cookies are essential for the website to function properly.'
  },
  preferences: {
    name: 'Preferences',
    description: 'These cookies remember your preferences and settings.'
  },
  analytics: {
    name: 'Analytics',
    description: 'These cookies help us understand how visitors interact with our website.'
  },
  marketing: {
    name: 'Marketing',
    description: 'These cookies track visitors across websites to display relevant ads.'
  }
};

const cookies: CookieType[] = [
  {
    name: 'session',
    provider: 'Our Website',
    purpose: 'Maintains your session state across page requests',
    expiry: 'Session',
    type: 'necessary'
  },
  {
    name: 'cookie_consent',
    provider: 'Our Website',
    purpose: 'Stores your cookie preferences',
    expiry: '1 year',
    type: 'necessary'
  },
  {
    name: 'theme',
    provider: 'Our Website',
    purpose: 'Remembers your theme preference (light/dark mode)',
    expiry: '1 year',
    type: 'preferences'
  },
  {
    name: 'language',
    provider: 'Our Website',
    purpose: 'Remembers your language preference',
    expiry: '1 year',
    type: 'preferences'
  },
  {
    name: '_ga',
    provider: 'Google Analytics',
    purpose: 'Distinguishes unique users',
    expiry: '2 years',
    type: 'analytics'
  },
  {
    name: '_gid',
    provider: 'Google Analytics',
    purpose: 'Distinguishes unique users',
    expiry: '24 hours',
    type: 'analytics'
  },
  {
    name: '_gat',
    provider: 'Google Analytics',
    purpose: 'Throttles request rate',
    expiry: '1 minute',
    type: 'analytics'
  },
  {
    name: '_fbp',
    provider: 'Facebook',
    purpose: 'Stores and tracks visits across websites',
    expiry: '3 months',
    type: 'marketing'
  },
  {
    name: 'fr',
    provider: 'Facebook',
    purpose: 'Delivers advertising and tracks ad performance',
    expiry: '3 months',
    type: 'marketing'
  }
];

const CookieConsentBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 p-4 z-50">
      <div className="max-w-6xl mx-auto">
        <div className="md:flex items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-8">
            <h3 className="font-medium mb-1">We Value Your Privacy</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="sm" className="flex-1">
              Cookie Settings
            </Button>
            <Button size="sm" className="flex-1">
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CookiePolicyPage() {
  const lastUpdated = "June 1, 2023";
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cookie Policy
        </h1>
        <p className="text-xl text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 mb-16">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <h2 className="font-medium mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {[
                  { id: 'what-are-cookies', label: '1. What Are Cookies?' },
                  { id: 'how-we-use', label: '2. How We Use Cookies' },
                  { id: 'types-cookies', label: '3. Types of Cookies' },
                  { id: 'third-party', label: '4. Third-Party Cookies' },
                  { id: 'managing', label: '5. Managing Cookies' },
                  { id: 'changes', label: '6. Changes to This Policy' },
                  { id: 'contact', label: '7. Contact Us' }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/legal/privacy">
                    View Privacy Policy
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              This Cookie Policy explains how [Company Name] ("we," "us," or "our") uses cookies and similar technologies to recognize you when you visit our website.
            </p>
          </div>

          <section id="what-are-cookies" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners.
              </p>
              <p className="mt-4">
                Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device for a set period of time or until you delete them, while session cookies are deleted when you close your browser.
              </p>
            </div>
          </section>

          <section id="how-we-use" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">2. How We Use Cookies</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>We use cookies for several purposes, including:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>To enable certain functions of the website</li>
                <li>To provide analytics about how visitors use our site</li>
                <li>To store your preferences and personalize your experience</li>
                <li>To enable advertisements and measure their effectiveness</li>
                <li>To prevent fraud and improve security</li>
              </ul>
            </div>
          </section>

          <section id="types-cookies" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">3. Types of Cookies</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {Object.entries(cookieTypes).map(([key, { name, description }]) => (
                <Card key={key} className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                        key === 'necessary' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                        key === 'preferences' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                        key === 'analytics' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                        'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                      }`}>
                        {key === 'necessary' ? <Shield className="h-5 w-5" /> :
                         key === 'preferences' ? <Settings className="h-5 w-5" /> :
                         key === 'analytics' ? <BarChart2 className="h-5 w-5" /> :
                         <Megaphone className="h-5 w-5" />}
                      </div>
                      <h3 className="font-medium">{name}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{description}</p>
                    <div className="mt-3 pt-3 border-t flex items-center">
                      {key === 'necessary' ? (
                        <>
                          <Check className="h-4 w-4 text-green-500 mr-1.5" />
                          <span className="text-sm">Always active</span>
                        </>
                      ) : (
                        <div className="flex items-center">
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input 
                              type="checkbox" 
                              id={`toggle-${key}`}
                              defaultChecked={key !== 'marketing'}
                              disabled={key === 'necessary'}
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label 
                              htmlFor={`toggle-${key}`}
                              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                            ></label>
                          </div>
                          <label htmlFor={`toggle-${key}`} className="text-sm">
                            {key === 'marketing' ? 'Inactive' : 'Active'}
                          </label>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h3 className="font-medium mt-6 mb-2">List of Cookies We Use</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Provider</th>
                      <th className="p-3 text-left">Purpose</th>
                      <th className="p-3 text-left">Expiry</th>
                      <th className="p-3 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cookies.map((cookie, i) => (
                      <tr key={i} className="hover:bg-muted/50">
                        <td className="p-3 font-mono text-sm">{cookie.name}</td>
                        <td className="p-3">{cookie.provider}</td>
                        <td className="p-3">{cookie.purpose}</td>
                        <td className="p-3">{cookie.expiry}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            cookie.type === 'necessary' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            cookie.type === 'preferences' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            cookie.type === 'analytics' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                            'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                          }`}>
                            {cookieTypes[cookie.type].name}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="third-party" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Cookies</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements, and so on.</p>
              <p className="mt-4">Examples of third-party cookies include:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Google Analytics:</strong> For understanding how visitors interact with our website</li>
                <li><strong>Facebook Pixel:</strong> For measuring the effectiveness of our advertising</li>
                <li><strong>Hotjar:</strong> For analyzing user behavior through heatmaps and session recordings</li>
              </ul>
              <p className="mt-4">
                These third-party services may also collect information about your use of other websites, apps, and online resources.
              </p>
            </div>
          </section>

          <section id="managing" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">5. Managing Cookies</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
              
              <h3 className="font-medium mt-6 mb-2">Browser Controls</h3>
              <p>Most web browsers allow you to manage your cookie preferences. Here are links to the help pages of major browsers:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Apple Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
                <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Internet Explorer</a></li>
              </ul>

              <h3 className="font-medium mt-6 mb-2">Do Not Track</h3>
              <p>
                Some browsers include a "Do Not Track" (DNT) setting that can send a signal to websites you visit indicating you do not wish to be tracked. Currently, our systems do not recognize browser "Do Not Track" signals.
              </p>
            </div>
          </section>

          <section id="changes" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">6. Changes to This Policy</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by the "Last updated" date at the top of this page.
              </p>
              <p className="mt-4">
                We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies and related technologies.
              </p>
            </div>
          </section>

          <section id="contact" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>If you have any questions about this Cookie Policy, please contact us:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>By email: privacy@example.com</li>
                <li>By visiting our <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link></li>
                <li>By mail: 123 Tech Street, San Francisco, CA 94107, United States</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <Cookie className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Manage Cookie Preferences</h2>
          <p className="text-muted-foreground mb-6">
            You can change your cookie preferences at any time by clicking the button below.
          </p>
          <Button>
            Open Cookie Settings
          </Button>
        </div>
      </div>

      {/* Cookie Consent Banner - This would be a separate component in a real app */}
      {/* <CookieConsentBanner /> */}
    </div>
  );
}

// Missing components (add these to your components directory if needed)
function BarChart2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-bar-chart-2"
      {...props}
    >
      <line x1="18" x2="18" y1="20" y2="10" />
      <line x1="12" x2="12" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="14" />
    </svg>
  );
}

function Megaphone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-megaphone"
      {...props}
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}
