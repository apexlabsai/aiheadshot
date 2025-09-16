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

interface DeliveryEmailProps {
  orderId: string
  customerName: string
  videoCount: number
  galleryUrl: string
  downloadUrl: string
}

export const DeliveryEmail = ({
  orderId,
  customerName,
  videoCount,
  galleryUrl,
  downloadUrl,
}: DeliveryEmailProps) => (
  <Html>
    <Head />
    <Preview>Your {videoCount} UGC ads are ready! 🎉</Preview>
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
        
        <Heading style={h1}>Your ads are ready! 🎉</Heading>
        
        <Text style={text}>
          Hi {customerName},
        </Text>
        
        <Text style={text}>
          Great news! We've finished creating your {videoCount} TikTok-ready ads. 
          They're optimized for maximum engagement and ready to upload to your ad platform.
        </Text>
        
        <Section style={infoBox}>
          <Text style={infoText}>
            <strong>Order ID:</strong> {orderId}
          </Text>
          <Text style={infoText}>
            <strong>Videos Created:</strong> {videoCount} ads
          </Text>
          <Text style={infoText}>
            <strong>Format:</strong> 9:16 vertical (TikTok/Reels ready)
          </Text>
        </Section>
        
        <Text style={text}>
          Each ad includes:
        </Text>
        
        <ul style={list}>
          <li style={listItem}>Professional voiceover</li>
          <li style={listItem}>Burned-in captions</li>
          <li style={listItem}>Optimized for mobile viewing</li>
          <li style={listItem}>Ready for immediate upload</li>
        </ul>
        
        <Section style={buttonContainer}>
          <Button style={primaryButton} href={galleryUrl}>
            View Your Ads
          </Button>
          <Button style={secondaryButton} href={downloadUrl}>
            Download All Videos
          </Button>
        </Section>
        
        <Text style={text}>
          <strong>Pro tip:</strong> Test different ads with small budgets first to see which ones perform best, 
          then scale up the winners!
        </Text>
        
        <Text style={text}>
          Need revisions? Reply to this email within 24 hours and we'll make adjustments to up to 2 ads.
        </Text>
        
        <Text style={footer}>
          Thanks for choosing UGC Ad Engine!<br />
          The Team
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

const list = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  paddingLeft: '20px',
}

const listItem = {
  margin: '8px 0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const primaryButton = {
  backgroundColor: '#007ee6',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '0 8px 8px 0',
}

const secondaryButton = {
  backgroundColor: '#6c757d',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '0 8px 8px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '32px 0 0',
}

export default DeliveryEmail
