RegisterCommand('lfm', function(source, args, rawCommand)
    -- Trigger het client-side event voor de speler die het commando heeft ingevoerd
    TriggerClientEvent('openLFM', source)
end, false)
