'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Textarea,
  SearchInput,
} from '@devlaunch/ui';
import { HelpCircle, Mail, MessageSquare, ExternalLink, ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: '1',
    question: 'How do I get started with the platform?',
    answer:
      'Getting started is easy! First, create your account and verify your email. Then, follow our onboarding guide to set up your first project. You can access the guide from the dashboard overview page.',
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For enterprise plans, we also offer invoice billing.',
  },
  {
    id: '3',
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Yes! You can change your plan at any time from the Billing section in Settings. Upgrades take effect immediately, while downgrades apply at the start of your next billing cycle.',
  },
  {
    id: '4',
    question: 'How do I invite team members?',
    answer:
      'Go to the Team page and click "Invite Member". Enter their email address and select their role. They will receive an invitation email with instructions to join.',
  },
  {
    id: '5',
    question: 'Is my data secure?',
    answer:
      'Absolutely! We use industry-standard encryption for data in transit and at rest. We are SOC 2 Type II certified and regularly undergo security audits. Your data is backed up daily.',
  },
  {
    id: '6',
    question: 'How do I export my data?',
    answer:
      'You can export your data from the Settings page under "Data & Privacy". We support exports in CSV, JSON, and Excel formats. Large exports will be sent to your email.',
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground mt-2">
          Find answers to common questions or contact support
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for help..."
          className="w-full"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-12">
        {/* Quick Links */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Documentation</CardTitle>
            </div>
            <CardDescription>
              Browse our comprehensive documentation and guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Docs
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Community</CardTitle>
            </div>
            <CardDescription>
              Join our community to ask questions and share ideas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              Join Community
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Email Support</CardTitle>
            </div>
            <CardDescription>
              Get help from our support team via email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Email Us
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {filteredFaqs.map((faq) => (
            <Card
              key={faq.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base font-medium">
                    {faq.question}
                  </CardTitle>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      openFaq === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </CardHeader>
              {openFaq === faq.id && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No FAQs found</p>
          </div>
        )}
      </div>

      {/* Contact Form */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Still need help?</CardTitle>
          <CardDescription>
            Send us a message and we&apos;ll get back to you as soon as possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What do you need help with?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe your issue or question..."
                rows={6}
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
