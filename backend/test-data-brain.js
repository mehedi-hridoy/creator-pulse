/**
 * Quick test for the Node.js Data Brain
 * Run with: node backend/test-data-brain.js
 */

import { analyzeData } from './src/services/dataBrain.js';

// Sample test data
const samplePlatforms = {
  youtube: [
    {
      views: 10000,
      likes: 500,
      comments: 50,
      shares: 20,
      title: "How to grow on YouTube",
      postedAt: "2025-11-01T14:00:00Z",
      durationSec: 600,
    },
    {
      views: 8000,
      likes: 400,
      comments: 40,
      shares: 15,
      title: "Best video editing tips",
      postedAt: "2025-11-05T18:00:00Z",
      durationSec: 480,
    },
    {
      views: 12000,
      likes: 600,
      comments: 60,
      shares: 25,
      title: "Viral content secrets",
      postedAt: "2025-11-10T16:00:00Z",
      durationSec: 720,
    },
  ],
  instagram: [
    {
      views: 5000,
      likes: 300,
      comments: 20,
      shares: 10,
      title: "Instagram growth hack",
      postedAt: "2025-11-03T12:00:00Z",
    },
    {
      views: 6000,
      likes: 350,
      comments: 25,
      shares: 12,
      title: "Reels that go viral",
      postedAt: "2025-11-08T20:00:00Z",
    },
  ],
  tiktok: [
    {
      views: 50000,
      likes: 2500,
      comments: 100,
      shares: 50,
      title: "TikTok dance trend",
      postedAt: "2025-11-02T15:00:00Z",
      durationSec: 15,
    },
    {
      views: 45000,
      likes: 2200,
      comments: 90,
      shares: 45,
      title: "Funny skit compilation",
      postedAt: "2025-11-07T19:00:00Z",
      durationSec: 30,
    },
  ],
};

console.log('🧪 Testing Node.js Data Brain...\n');
console.log('📊 Sample Data:');
console.log('- YouTube: 3 posts');
console.log('- Instagram: 2 posts');
console.log('- TikTok: 2 posts\n');

try {
  const results = analyzeData(samplePlatforms);
  
  console.log('✅ Analysis Complete!\n');
  console.log('📅 Generated At:', results.generatedAt);
  console.log('🔧 Engine:', results.meta.engine);
  console.log('\n📈 Results Summary:');
  console.log('- Posting schedules:', Object.keys(results.postingSchedule).length, 'platforms');
  console.log('- Platform focus entries:', results.platformFocus.length);
  console.log('- Growth alerts:', results.alerts.length);
  console.log('- Content themes:', results.contentThemes.length);
  
  console.log('\n🎯 Platform Focus (Top 3):');
  results.platformFocus.slice(0, 3).forEach((pf, i) => {
    console.log(`${i + 1}. ${pf.platform.toUpperCase()}`);
    console.log(`   - Engagement Rate: ${(pf.engagementRate * 100).toFixed(2)}%`);
    console.log(`   - Growth: ${(pf.growth * 100).toFixed(1)}%`);
    console.log(`   - Decision: ${pf.decision}`);
  });
  
  console.log('\n⏰ Best Posting Times (YouTube):');
  const ytSchedule = results.postingSchedule.youtube;
  if (ytSchedule && ytSchedule.recommendations.length > 0) {
    ytSchedule.recommendations.forEach((rec, i) => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      console.log(`${i + 1}. ${days[rec.weekday]} ${rec.hourStart}:00-${rec.hourEnd}:00`);
    });
  } else {
    console.log('   (Insufficient data for schedule)');
  }
  
  console.log('\n⚠️ Alerts:', results.alerts.length > 0 ? results.alerts[0].type : 'None');
  
  console.log('\n✅ All systems operational!');
  console.log('🚀 Ready for cPanel deployment!\n');
  
} catch (error) {
  console.error('❌ Test Failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}
