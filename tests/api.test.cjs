const {test}=require('node:test');const assert=require('node:assert/strict');const handler=require('../api/generate.js');
const brief={name:'Test',industry:'Education',description:'Language classes',audience:'Adult learners',offer:'An introductory lesson',goal:'Enrolment',tone:'Warm',campaign:'Start learning'};
function response(){return {headers:{},setHeader(k,v){this.headers[k]=v},status(n){this.code=n;return this},json(v){this.body=v;return this}}}
async function call(req){const res=response();await handler({headers:{host:'orbit.example'},...req},res);return res;}
test('server endpoint guards and complete AI response mapping',{concurrency:false},async()=>{
 const oldKey=process.env.OPENAI_API_KEY,oldFetch=global.fetch;
 try{
  delete process.env.OPENAI_API_KEY;
  assert.equal((await call({method:'GET'})).code,405);
  
  assert.equal((await call({method:'POST',headers:{host:'orbit.example',origin:'https://other.example'},body:{brief}})).code,403);
  assert.equal((await call({method:'POST',body:{brief:{}}})).code,400);
  const triple=['a','b','c'];
  const campaign={subject:'learning',outcome:'confidence',pain:'choosing',tool:'Assessment',magnet:'Workbook',criteria:triple,tips:triple,quizOptions:[triple,triple,triple],personas:triple.map(x=>({role:x,need:x,question:x,objection:x})),blogs:['Awareness','Consideration','Decision'].map(stage=>({stage,title:'Title',cta:'Next',body:'Useful draft',searchHeadline:'Headline',searchBody:'Description',socialBody:'Social',landingHeadline:'Welcome'})),resource:'Priorities: {{answer0}}',followup:'Deliver then help'};
  global.fetch=async(url,options)=>{assert.equal(url,'https://gemini-proxy-boldstudio.vercel.app/api/gemini');const body=JSON.parse(options.body);assert.equal(body.generationConfig.responseMimeType,'application/json');assert.ok(body.generationConfig.responseJsonSchema);assert.deepEqual(JSON.parse(body.contents[0].parts[0].text),brief);assert.ok(!options.headers.Authorization);return {ok:true,json:async()=>({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(campaign)}]}}]})}};
  const success=await call({method:'POST',body:{brief}});assert.equal(success.code,200);assert.deepEqual(success.body.campaign,campaign);assert(!JSON.stringify(success.body).includes('test-only-placeholder'));
  global.fetch=async()=>({ok:true,json:async()=>({candidates:[{finishReason:'MAX_TOKENS',content:{parts:[{text:'{}'}]}}]})});assert.equal((await call({method:'POST',body:{brief}})).code,502);
  global.fetch=async()=>({ok:false,status:401});assert.equal((await call({method:'POST',body:{brief}})).code,502);
  global.fetch=async()=>({ok:false,status:429});assert.equal((await call({method:'POST',body:{brief}})).code,429);
  global.fetch=async()=>({ok:true,json:async()=>({candidates:[{finishReason:'STOP',content:{parts:[{text:'{}'}]}}]})});assert.equal((await call({method:'POST',body:{brief}})).code,502);
 }finally{global.fetch=oldFetch;if(oldKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=oldKey;}
});
