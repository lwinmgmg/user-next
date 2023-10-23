import { ConversationDetail } from "@/types/conversationInfo.type";
import { UserDict } from "./user";
import { checkUser } from "./userGetter";
import { ConversationDetailDict } from "./conversation";

function getConvName(conv: ConversationDetail, userId: string, users: UserDict){
    var name = "Anonymous"
    switch (conv.conv_type){
        case 1:
            const client = conv.conv_users.filter(convUser=>convUser.user_id != userId)
            if (client.length > 0){
                if (client[0] && client[0].name && client[0].name.length > 0){
                    name = client[0].name;
                    break;
                }
                const clientUser = client[0] && checkUser(users, client[0].user_id);
                if (clientUser){
                    name = `${clientUser.partner_data.first_name} ${clientUser.partner_data.last_name}`
                }
            }else{
                const clientUser = checkUser(users, userId);
                if (clientUser){
                    name = `${clientUser.partner_data.first_name} ${clientUser.partner_data.last_name} (You)`;
                }
            }
            break
        case 2:
            if (conv.name && conv.name.length > 0){
                name = conv.name;
                break;
            }
            name = conv.conv_users.map(convUser=>{
                const clientUser = checkUser(users, convUser.user_id)
                if (clientUser){
                    return `${clientUser.partner_data.first_name} ${clientUser.partner_data.last_name}`;
                }
            }).join(", ");
            break
    }
    return name;
}

function checkConv(convs: ConversationDetailDict, convId: number): ConversationDetail | undefined{
    return convs[convId];
}

export {
    getConvName, checkConv
}
