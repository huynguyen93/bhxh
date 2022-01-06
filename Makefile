upload:
	rsync -av ./build/* dailydictation.com:/home/huy/sites/khoahuy/bhxh --progress --delete
