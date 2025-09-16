export interface LLMProvider {
  generateScript(template: string, productData: ProductData, preferences: UserPreferences): Promise<string>
  generateHook(productData: ProductData, preferences: UserPreferences): Promise<string>
  generateCTA(productData: ProductData, preferences: UserPreferences): Promise<string>
}

export interface ProductData {
  title: string
  description: string
  price: string
  benefits: string[]
  reviews: Array<{ rating: number; text: string }>
  url: string
}

export interface UserPreferences {
  brandVoice: 'playful' | 'minimal' | 'clinical'
  targetAudience: string
  keyBenefits: string[]
}

class MockLLMProvider implements LLMProvider {
  async generateScript(template: string, productData: ProductData, preferences: UserPreferences): Promise<string> {
    const hooks = [
      "POV: You just discovered the secret that's changing everything...",
      "This is why everyone's switching to this in 2024...",
      "I wish I knew about this sooner...",
      "The thing that changed my mind about this product...",
      "Why I'm never going back to the old way..."
    ]
    
    const randomHook = hooks[Math.floor(Math.random() * hooks.length)]
    
    return `${randomHook}

${productData.title} is literally changing the game. 

${productData.benefits.slice(0, 3).map(benefit => `• ${benefit}`).join('\n')}

The best part? It's only ${productData.price}.

No more ${preferences.targetAudience.toLowerCase()} problems. Just results.

Get yours now - link in bio.`
  }

  async generateHook(productData: ProductData, preferences: UserPreferences): Promise<string> {
    const hooks = [
      "POV: You just discovered the secret that's changing everything...",
      "This is why everyone's switching to this in 2024...",
      "I wish I knew about this sooner...",
      "The thing that changed my mind about this product...",
      "Why I'm never going back to the old way..."
    ]
    
    return hooks[Math.floor(Math.random() * hooks.length)]
  }

  async generateCTA(productData: ProductData, preferences: UserPreferences): Promise<string> {
    const ctas = [
      "Get yours now - link in bio",
      "Tap the link to get yours",
      "Don't wait - grab it now",
      "Link in bio to order",
      "Get it before it's gone"
    ]
    
    return ctas[Math.floor(Math.random() * ctas.length)]
  }
}

class ClaudeProvider implements LLMProvider {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateScript(template: string, productData: ProductData, preferences: UserPreferences): Promise<string> {
    // Implementation for Claude API
    // This would make actual API calls to Claude
    return "Claude-generated script placeholder"
  }

  async generateHook(productData: ProductData, preferences: UserPreferences): Promise<string> {
    // Implementation for Claude API
    return "Claude-generated hook placeholder"
  }

  async generateCTA(productData: ProductData, preferences: UserPreferences): Promise<string> {
    // Implementation for Claude API
    return "Claude-generated CTA placeholder"
  }
}

class OpenAIProvider implements LLMProvider {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateScript(template: string, productData: ProductData, preferences: UserPreferences): Promise<string> {
    // Implementation for OpenAI API
    return "OpenAI-generated script placeholder"
  }

  async generateHook(productData: ProductData, preferences: UserPreferences): Promise<string> {
    // Implementation for OpenAI API
    return "OpenAI-generated hook placeholder"
  }

  async generateCTA(productData: ProductData, preferences: UserPreferences): Promise<string> {
    // Implementation for OpenAI API
    return "OpenAI-generated CTA placeholder"
  }
}

export function createLLMProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER || 'mock'
  
  switch (provider) {
    case 'claude':
      if (!process.env.CLAUDE_API_KEY) {
        throw new Error('CLAUDE_API_KEY is required when using Claude provider')
      }
      return new ClaudeProvider(process.env.CLAUDE_API_KEY)
    
    case 'openai':
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is required when using OpenAI provider')
      }
      return new OpenAIProvider(process.env.OPENAI_API_KEY)
    
    case 'mock':
    default:
      return new MockLLMProvider()
  }
}
