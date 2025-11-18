import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Row,
  Column,
} from '@react-email/components';
interface ContactConfirmationEmailProps {
  name: string;
  email: string;
  project: string;
  messageSnippet: string;
}

export const ContactConfirmationEmail = ({
  name,
  email,
  project,
  messageSnippet,
}: ContactConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thanks for reaching out, {name}! I'll get back to you soon.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Thanks for reaching out!</Heading>
          </Section>

          <Section style={content}>
            <Text style={text}>
              Hi <strong>{name}</strong>,
            </Text>
            <Text style={text}>
              Thank you for contacting me through my portfolio website. I&apos;ve received your message and wanted to confirm that it came through successfully.
            </Text>
            
            <Section style={summarySection}>
              <Heading style={h2}>What you submitted:</Heading>
              <Row>
                <Column>
                  <Text style={labelText}>Name:</Text>
                </Column>
                <Column>
                  <Text style={valueText}>{name}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={labelText}>Email:</Text>
                </Column>
                <Column>
                  <Text style={valueText}>{email}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={labelText}>Project Type:</Text>
                </Column>
                <Column>
                  <Text style={valueText}>{project}</Text>
                </Column>
              </Row>
              <Row>
                <Column style={{ width: '100%' }}>
                  <Text style={labelText}>Message snippet:</Text>
                  <Text style={snippetText}>&ldquo;{messageSnippet}&rdquo;</Text>
                </Column>
              </Row>
            </Section>

            <Text style={text}>
              I&apos;ll review your message carefully and get back to you within 24 hours. If your project is time-sensitive, feel free to reach out to me directly on LinkedIn.
            </Text>

            <Text style={text}>
              Thanks again for your interest in working together!
            </Text>

            <Text style={signature}>
              Best regards,<br />
              <strong>Fernando Rodriguez</strong><br />
              Senior Frontend Developer<br />
              <a href="https://fernandomemije.dev" style={link}>fernandomemije.dev</a>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This is an automated confirmation email. Please do not reply to this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ContactConfirmationEmail.PreviewProps = {
  name: 'John Smith',
  email: 'john@example.com',
  project: 'Full-time Position',
  messageSnippet: 'I&apos;m interested in discussing a frontend developer position at our startup...',
} as ContactConfirmationEmailProps;

export default ContactConfirmationEmail;

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const header = {
  backgroundColor: '#1a365d',
  borderRadius: '8px 8px 0 0',
  padding: '32px 40px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  lineHeight: '1.3',
};

const h2 = {
  color: '#1a365d',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '32px 0 16px 0',
  lineHeight: '1.3',
};

const content = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '0 0 8px 8px',
  padding: '40px',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
};

const summarySection = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const labelText = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 4px 0',
  width: '120px',
};

const valueText = {
  color: '#374151',
  fontSize: '16px',
  margin: '0 0 12px 0',
};

const snippetText = {
  color: '#374151',
  fontSize: '15px',
  fontStyle: 'italic',
  margin: '8px 0 0 0',
  padding: '12px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '4px',
  lineHeight: '1.5',
};

const signature = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '32px 0 16px 0',
};

const link = {
  color: '#3b82f6',
  textDecoration: 'none',
};

const footer = {
  borderTop: '1px solid #e2e8f0',
  padding: '20px 40px',
  textAlign: 'center' as const,
  marginTop: '32px',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
};