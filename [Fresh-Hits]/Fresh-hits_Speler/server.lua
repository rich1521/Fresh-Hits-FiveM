RegisterCommand('fh', function(source, args, rawCommand)
    -- Trigger het client-side event voor de speler die het commando heeft ingevoerd
    TriggerClientEvent('openFH', source)
end, false)
