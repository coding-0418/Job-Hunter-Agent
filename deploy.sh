#!/bin/bash

echo "Job Agent - Deployment Helper"
echo "============================="
echo ""
echo "This script helps you deploy the Job Agent to Vercel."
echo "Prerequisites: Vercel CLI installed (npm i -g vercel)"
echo ""

echo "1. Login to Vercel..."
npx vercel login

echo "2. Link project..."
npx vercel link

echo "3. Set Environment Variables..."
echo "Please ensure you have set the following env vars in Vercel Project Settings:"
echo "- NEXT_PUBLIC_SUPABASE_URL"
echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "- DATABASE_URL"
echo "- DIRECT_URL"

read -p "Are env vars set? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please set them and run this script again."
    exit 1
fi

echo "4. Deploying to Production..."
npx vercel --prod

echo "Deployment complete!"
