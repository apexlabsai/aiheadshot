import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface OrderReceivedEmailProps {
  orderId: string
  customerName: string
  productUrl: string
  etaHours: number
}

export const OrderReceivedEmail = ({
  orderId,
  customerName,
  productUrl,
  etaHours,
}: OrderReceivedEmailProps) => (
  <Html>
    <Head />
    <Preview>Your UGC ads are being created - delivery in {etaHours}h</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src="https://yourdomain.com/logo.png"
            width="120"
            height="40"
            alt="UGC Ad Engine"
            style={logo}
          />
        </Section>
        
        <Heading style={h1}>We're creating your ads!</Heading>
        
        <Text style={text}>
          Hi {customerName},
        </Text>
        
        <Text style={text}>
          Thanks for your order! We've received your product URL and preferences, 
          and our AI is now working on creating your 5 TikTok-ready ads.
        </Text>
        
        <Section style={infoBox}>
          <Text style={infoText}>
            <strong>Order ID:</strong> {orderId}
          </Text>
          <Text style={infoText}>
            <strong>Product:</strong> {productUrl}
          </Text>
          <Text style={infoText}>
            <strong>Delivery:</strong> {etaHours} hours
          </Text>
        </Section>
        
        <Text style={text}>
          We'll email you as soon as your ads are ready with a gallery link and download options.
        </Text>
        
        <Section style={buttonContainer}>
          <Button style={button} href={`https://yourdomain.com/orders/${orderId}`}>
            Track Your Order
          </Button>
        </Section>
        
        <Text style={text}>
          Questions? Just reply to this email and we'll help you out.
        </Text>
        
        <Text style={footer}>
          Best regards,<br />
          The UGC Ad Engine Team
        </Text>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const logoContainer = {
  textAlign: 'center' as const,
  marginBottom: '32px',
}

const logo = {
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
}

const infoBox = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const infoText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '8px 0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#007ee6',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '32px 0 0',
}

export default OrderReceivedEmail
