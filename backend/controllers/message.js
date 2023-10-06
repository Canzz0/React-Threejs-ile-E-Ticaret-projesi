
// socketServer.js
const { v4: uuidv4 } = require("uuid");

const http = require('http');
const MessageModel = require('../models/message');
const { Server } = require('socket.io');

function SocketServer(app) {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
        }
    });

    // Socket.io bağlantısı
    io.on('connection', (socket) => {
        console.log('Yeni bir kullanıcı bağlandı');

        socket.on('message', async (messageData) => {
            try {
                const message = new MessageModel({
                    _id: uuidv4(),
                    message: messageData.message,
                    senderId: messageData.senderId,
                    receivedId: messageData.receivedId,
                    seen: messageData.seen
                });
                await message.save();

                // Tüm istemcilere yeni mesajı gönderin
                io.emit('message', message);

                // Mesajı gönderen istemciye geri döndürün
                socket.broadcast.emit('returnMessage', message);
            } catch (error) {
                console.error(error);
            }
        });

        // Kullanıcı bağlantısını kes
        socket.on('disconnect', () => {
            console.log('Bir kullanıcı ayrıldı');
        });
    });

    server.listen(3001, () => {
        console.log('Sunucu 3001 portunda çalışıyor');
    });
}

module.exports = { SocketServer };


const getMessage = async (req, res) => {
    try {
        const messages = await MessageModel.aggregate([
            {
                $lookup: {
                    from: "users", // ilişkili tablo
                    localField: "receivedId", // messages'de karşılığı
                    foreignField: "_id", // users'da karşılığı
                    as: "receivedInfo" // saklanacak alan bunun üzerinden çağırıcaz
                }
            },
        ]);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getMessage };

