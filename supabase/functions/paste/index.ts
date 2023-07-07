import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.26.0"
import { corsHeaders } from '../_shared/cors.ts'

// get our supabase url and key from the environment variables
const supUrl = Deno.env.get('_SUPABASE_URL') as string;
const supKey = Deno.env.get('_SUPABASE_SERVICE_KEY') as string;

// create a supabase client
const supabase = createClient(supUrl, supKey);

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Extract the title and body from the request body
    const { title, body } = await req.json()



    // // Insert a new row into the "posts" table.
    // const data = await supabase.from('posts').insert(
    //   []
    // ).select()


    const { data, error } = await supabase
    .from('pastes')
    .insert({ title: title, body: body })
    .select()

    // return the uuid of the new row
    return new Response(JSON.stringify( data ), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  }  catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
