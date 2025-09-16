# UGC Ad Engine

Turn any product page into 5 TikTok-ready ads in an hour. We write the hook, voice it, cut it, caption it. You hit 'Upload to Ads Manager.'

## 🚀 Features

- **AI-Powered Ad Creation**: Generate 5 different ad variations using proven templates
- **Professional Voiceovers**: High-quality TTS with multiple voice options
- **9:16 Vertical Format**: Optimized for TikTok, Instagram Reels, and Facebook Stories
- **Burned-in Captions**: Accessibility-friendly captions for better engagement
- **Commercial Rights**: Full rights to use your ads for any business purpose
- **24h Delivery**: Most orders completed within 24 hours
- **Admin Dashboard**: Monitor orders, resend emails, and manage failed jobs

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: Prisma + SQLite (local) / Postgres (production)
- **Payments**: Stripe Checkout
- **File Uploads**: UploadThing
- **Queue**: Upstash Q (production) / In-memory (development)
- **AI**: Provider abstraction (Claude, OpenAI, Mock)
- **TTS**: Provider abstraction (ElevenLabs, AWS Polly, Mock)
- **Video**: FFmpeg for composition
- **Email**: Resend + React Email

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd aiheadshot
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables (see [Environment Variables](#environment-variables) section)

4. **Set up the database**
   ```bash
   pnpm db:push
   pnpm db:generate
   ```

5. **Seed Stripe products**
   ```bash
   pnpm seed:stripe
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

7. **Start the worker (in a separate terminal)**
   ```bash
   pnpm worker
   ```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Database
DATABASE_URL="file:./dev.db"

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
PRICE_AD_PACK=price_your_ad_pack_price_id

# Uploads / Storage
UPLOADTHING_TOKEN=sk_live_your_uploadthing_token
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Email
RESEND_API_KEY=re_your_resend_api_key
FROM_EMAIL="UGC Ad Engine <hello@yourdomain.com>"

# Queue
UPSTASH_Q_REST_URL=https://your-redis-url.upstash.io
UPSTASH_Q_REST_TOKEN=your_redis_token

# AI Providers
LLM_PROVIDER=mock
TTS_PROVIDER=mock

# Claude (if using)
CLAUDE_API_KEY=your_claude_api_key

# OpenAI (if using)
OPENAI_API_KEY=your_openai_api_key

# ElevenLabs (if using)
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# AWS (if using)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1

# Admin
ADMIN_PASSWORD=your_admin_password

# Capacity
DAILY_CAP=25
```

## 🎬 Ad Templates

The system includes 4 proven ad templates:

1. **Unbox & Benefit**: Hook → Unbox → 3 benefits → CTA
2. **Problem & Solution**: Problem POV → reveal → demo → CTA
3. **Three Reasons**: "3 reasons I switched to X" → quick cuts
4. **Testimonial Mash**: Pseudo-UGC quotes + captions + logo sting

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Start the production server**
   ```bash
   pnpm start
   ```

3. **Start the worker** (use PM2 or similar)
   ```bash
   pnpm worker
   ```

## 📊 Usage

### Customer Flow

1. **Landing Page** (`/`) - Marketing page with pricing and social proof
2. **Buy Page** (`/buy`) - Stripe checkout for Ad Pack ($149)
3. **Order Form** (`/order`) - Product details and preferences
4. **Order Tracking** (`/orders/[id]`) - Real-time status updates
5. **Gallery** (`/gallery/[id]`) - Download completed videos

### Admin Flow

1. **Admin Dashboard** (`/admin`) - Monitor all orders
2. **Order Management** - View, retry, and resend emails
3. **Analytics** - Track completion rates and performance

## 🔄 Background Processing

The system uses a queue-based architecture for video processing:

- **Development**: In-memory queue with polling
- **Production**: Upstash Q for reliable job processing
- **Retry Logic**: Exponential backoff with max retries
- **Error Handling**: Failed jobs are logged and can be retried

## 🎥 Video Processing

Videos are created using FFmpeg with:

- **Format**: 9:16 vertical (1080x1920)
- **Frame Rate**: 30fps
- **Bitrate**: 2000k video, 128k audio
- **Captions**: WebVTT format with burned-in subtitles
- **Transitions**: Smooth cuts and fades between shots

## 📧 Email System

Email templates are built with React Email:

- **Order Confirmation**: Sent after successful payment
- **Delivery Notification**: Sent when videos are ready
- **Failed Order**: Sent if processing fails

## 🧪 Testing

### Mock Mode

The system runs in mock mode by default, allowing you to test the complete flow without external API costs:

```bash
# Generate demo videos
pnpm demo:render
```

### Real API Testing

To test with real APIs, update your environment variables:

```env
LLM_PROVIDER=claude
TTS_PROVIDER=elevenlabs
```

## 📈 Monitoring

### Admin Dashboard

Access the admin dashboard at `/admin` to:

- View all orders and their status
- Monitor processing times
- Retry failed jobs
- Resend delivery emails
- Track system performance

### Logs

The system logs important events:

- Order creation and updates
- Job processing status
- Error messages and stack traces
- Email delivery status

## 🔒 Security

- **Authentication**: NextAuth with email magic links
- **File Uploads**: Secure file handling with type validation
- **Admin Access**: Password-protected admin dashboard
- **API Security**: Rate limiting and input validation
- **Data Privacy**: 30-day data retention policy

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection**
   ```bash
   pnpm db:push
   pnpm db:generate
   ```

2. **Stripe Webhook Issues**
   - Verify webhook URL in Stripe dashboard
   - Check webhook secret in environment variables

3. **Video Processing Fails**
   - Ensure FFmpeg is installed
   - Check file permissions for output directory
   - Verify stock assets are available

4. **Email Delivery Issues**
   - Verify Resend API key
   - Check FROM_EMAIL format
   - Ensure domain is verified

### Debug Mode

Enable debug logging by setting:

```env
NODE_ENV=development
DEBUG=true
```

## 📝 API Reference

### Endpoints

- `POST /api/stripe/checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks
- `POST /api/orders` - Submit order form
- `GET /api/orders/[id]` - Get order details
- `GET /api/admin/orders` - Get all orders (admin)
- `POST /api/admin/resend-email` - Resend delivery email
- `POST /api/admin/retry-job` - Retry failed job

### Webhooks

- `checkout.session.completed` - Create order and job
- `payment_intent.succeeded` - Confirm payment
- `payment_intent.payment_failed` - Handle failed payment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@yourdomain.com or create an issue in the repository.

---

**Built with ❤️ for entrepreneurs who want to scale their ad creative without the hassle.**