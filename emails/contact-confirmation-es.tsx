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

interface ContactConfirmationEmailEsProps {
  name: string;
  email: string;
  project: string;
  messageSnippet: string;
}

export const ContactConfirmationEmailEs = ({
  name,
  email,
  project,
  messageSnippet,
}: ContactConfirmationEmailEsProps) => {
  return (
    <Html>
      <Head />
      <Preview>¡Gracias por contactarme, {name}! Te responderé pronto.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>¡Gracias por contactarme!</Heading>
          </Section>

          <Section style={content}>
            <Text style={text}>
              Hola <strong>{name}</strong>,
            </Text>
            <Text style={text}>
              Gracias por contactarme a través de mi sitio web de portafolio. He recibido tu mensaje y quería confirmar que llegó exitosamente.
            </Text>
            
            <Section style={summarySection}>
              <Heading style={h2}>Lo que enviaste:</Heading>
              <Row>
                <Column>
                  <Text style={labelText}>Nombre:</Text>
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
                  <Text style={labelText}>Tipo de Proyecto:</Text>
                </Column>
                <Column>
                  <Text style={valueText}>{project}</Text>
                </Column>
              </Row>
              <Row>
                <Column style={{ width: '100%' }}>
                  <Text style={labelText}>Fragmento del mensaje:</Text>
                  <Text style={snippetText}>&ldquo;{messageSnippet}&rdquo;</Text>
                </Column>
              </Row>
            </Section>

            <Text style={text}>
              Revisaré tu mensaje cuidadosamente y te responderé dentro de las próximas 24 horas. Si tu proyecto es urgente, no dudes en contactarme directamente por <a href="https://linkedin.com/in/fernando-rm" style={link}>LinkedIn</a>.
            </Text>

            <Text style={text}>
              ¡Gracias nuevamente por tu interés en trabajar juntos!
            </Text>

            <Text style={signature}>
              Saludos cordiales,<br />
              <strong>Fernando Rodriguez</strong><br />
              Ingeniero de Software Senior<br />
              <a href="https://fernandomemije.dev" style={link}>fernandomemije.dev</a>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Este es un email de confirmación automático. Por favor no responder a este mensaje.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ContactConfirmationEmailEs.PreviewProps = {
  name: 'Juan Pérez',
  email: 'juan@example.com',
  project: 'Posición Tiempo Completo',
  messageSnippet: 'Estoy interesado en discutir una posición de desarrollador frontend en nuestra startup...',
} as ContactConfirmationEmailEsProps;

export default ContactConfirmationEmailEs;

// Styles (same as English version)
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