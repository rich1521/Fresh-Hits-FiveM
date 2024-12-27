fx_version 'cerulean'
game 'gta5'
author 'LeagueFM | rich1521'
description 'Dit script geeft jouw in game toegang tot onze player.'
version '0.0.1'
lua54 'yes'

ui_page 'player/index.html'

files {
    'player/index.html',
    'player/style.css',
    'player/player.js'
}

client_script 'client.lua'
server_script 'server.lua'