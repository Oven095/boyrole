local PlaceId = game.PlaceId
local Env = getgenv()

if PlaceId == 717 then
    if Env.Kaitun then
        
        loadstring(game:HttpGet(
            "https://gitlab.com/arsyny1x-a2c/kaitun-kanom/-/raw/main/main.lua"
        ))()
    else
   
        loadstring(game:HttpGet(
            "https://raw.githubusercontent.com/arsyny1x/Kanom-Tokyo-V2/refs/heads/main/main.lua"
        ))()
    end

elseif PlaceId == 104549080643413 then -- MAHANAKHON RACING
        loadstring(game:HttpGet("https://lua-raw-host.mahanakon.workers.dev/raw/7e22473e-77d2-43dd-b23d-2edcd93c8f7c/main.lua"))()
end
