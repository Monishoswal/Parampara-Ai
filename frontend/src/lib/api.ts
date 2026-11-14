import {
  Craft,
  Artisan,
  StoryItem,
  Product,
  OrderReceipt,
  Opportunity,
  ImageAnalysisResult,
  QAResult,
  CuratorQueueItem,
  CuratorStats
} from '../types';

const API_BASE = '/api';

export const api = {
  // 1. CRAFTS
  async getCrafts(category?: string, state?: string, search?: string): Promise<Craft[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (state) params.append('state', state);
    if (search) params.append('search', search);

    try {
      const res = await fetch(`${API_BASE}/crafts?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch crafts');
      return await res.json();
    } catch (err) {
      console.warn('API fetchCrafts error, falling back to local dataset', err);
      return [];
    }
  },

  async getCraft(slugOrId: string): Promise<Craft> {
    const res = await fetch(`${API_BASE}/crafts/${slugOrId}`);
    if (!res.ok) throw new Error(`Craft ${slugOrId} not found`);
    return await res.json();
  },

  // 2. HERITAGE LENS
  async analyzeImage(file?: File): Promise<ImageAnalysisResult> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }

    const res = await fetch(`${API_BASE}/heritage/analyse-image`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Image analysis failed');
    return await res.json();
  },

  // 3. HERITAGE Q&A
  async askHeritage(question: string, craftSlug?: string): Promise<QAResult> {
    const res = await fetch(`${API_BASE}/heritage/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, craft_slug: craftSlug }),
    });
    if (!res.ok) throw new Error('Failed to retrieve grounded answer');
    return await res.json();
  },

  // 4. STORIES / VOICE OF TRADITION
  async getStories(craftId?: string): Promise<StoryItem[]> {
    const url = craftId ? `${API_BASE}/stories?craft_id=${craftId}` : `${API_BASE}/stories`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch stories');
    return await res.json();
  },

  async transcribeVoice(file?: Blob, languageHint: string = 'hi'): Promise<{
    transcript_text: string;
    detected_language: string;
    confidence_note: string;
    uncertain_terms: string[];
    is_draft: boolean;
    disclaimer: string;
  }> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file, 'recording.mp3');
    }
    formData.append('language_hint', languageHint);

    const res = await fetch(`${API_BASE}/stories/transcribe`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Transcription failed');
    return await res.json();
  },

  async structureStory(transcript: string, contributorName: string, language: string = 'Hindi') {
    const res = await fetch(`${API_BASE}/stories/structure`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transcript,
        contributor_name: contributorName,
        language,
      }),
    });
    if (!res.ok) throw new Error('Structuring failed');
    return await res.json();
  },

  // 5. PRODUCTS & BAZAAR MARKETPLACE
  async getProducts(params?: { category?: string; zone?: string; search?: string }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'all') query.append('category', params.category);
    if (params?.zone && params.zone !== 'all') query.append('zone', params.zone);
    if (params?.search) query.append('search', params.search);

    const qs = query.toString() ? `?${query.toString()}` : '';
    const res = await fetch(`${API_BASE}/products${qs}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  },

  async getProduct(productId: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${productId}`);
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  },

  async placeOrder(orderData: {
    customer_name: string;
    customer_phone: string;
    customer_email?: string;
    shipping_address: string;
    city: string;
    state: string;
    pincode: string;
    payment_method: string;
    items: { product_id: string; quantity: number; price_inr: number }[];
  }): Promise<OrderReceipt> {
    const res = await fetch(`${API_BASE}/products/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to place order');
    }
    return await res.json();
  },

  async generateProductDraft(data: {
    artisan_name: string;
    craft_id: string;
    product_category: string;
    materials_supplied: string[];
    dimensions?: string;
    technique_note?: string;
  }) {
    const res = await fetch(`${API_BASE}/products/generate-draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to generate product draft');
    return await res.json();
  },

  // 6. OPPORTUNITIES
  async getOpportunities(category?: string): Promise<Opportunity[]> {
    const url = category ? `${API_BASE}/opportunities?category=${category}` : `${API_BASE}/opportunities`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch opportunities');
    return await res.json();
  },

  // 7. ARTISANS
  async getArtisans(): Promise<Artisan[]> {
    const res = await fetch(`${API_BASE}/artisans`);
    if (!res.ok) throw new Error('Failed to fetch artisans');
    return await res.json();
  },

  async getArtisan(slugOrId: string): Promise<Artisan> {
    const res = await fetch(`${API_BASE}/artisans/${slugOrId}`);
    if (!res.ok) throw new Error('Artisan profile not found');
    return await res.json();
  },

  // 8. CURATOR CONSOLE
  async getCuratorQueue(): Promise<CuratorQueueItem[]> {
    const res = await fetch(`${API_BASE}/curator/review-queue`);
    if (!res.ok) throw new Error('Failed to fetch curator queue');
    return await res.json();
  },

  async reviewSubmission(submissionId: string, decision: string, notes: string, reviewerName: string = 'Chief Curator') {
    const res = await fetch(`${API_BASE}/curator/reviews/${submissionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission_id: submissionId,
        decision,
        notes,
        reviewer_name: reviewerName,
      }),
    });
    if (!res.ok) throw new Error('Review submission failed');
    return await res.json();
  },

  async updateClaimStatus(claimId: string, newStatus: string, reviewerName: string = 'Dr. Ananya Sharma', note?: string) {
    const res = await fetch(`${API_BASE}/curator/claims/${claimId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        claim_id: claimId,
        new_status: newStatus,
        reviewer_name: reviewerName,
        review_note: note,
      }),
    });
    if (!res.ok) throw new Error('Claim update failed');
    return await res.json();
  },

  async getCuratorStats(): Promise<CuratorStats> {
    const res = await fetch(`${API_BASE}/curator/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  },

  async getAuditTrail(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/curator/audit`);
    if (!res.ok) throw new Error('Failed to fetch audit trail');
    return await res.json();
  },
};
