#!/bin/bash

echo "Testing get_paste_by_uuid"
echo
curl -L -X POST 'https://szsaextmvibiosujacix.supabase.co/functions/v1/get_paste_by_uuid' --data '{"uuid":"721adcd8-64b7-4b0b-89e0-4ba563d57bb4"}'
echo
echo
echo "Testing paste"
curl -L -X POST 'https://szsaextmvibiosujacix.supabase.co/functions/v1/paste' --data '{"body":"the body", "title":"the title"}'