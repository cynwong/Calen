export const indexDBConfig = {
	name: 'calen',
	version: 1,
	objectStoresMeta: [
		{
			store: 'events',
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'action', keypath: 'action', options: { unique: false } },
				{ name: 'data', keypath: 'data', options: { unique: false } }
			]
		}
	]
};