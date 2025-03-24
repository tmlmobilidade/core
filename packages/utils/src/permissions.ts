import { Permission } from '@tmlmobilidade/types';
import { mergekit } from 'mergekit';

/**
 * Get a permission from a list of permissions
 * @param permissions - The list of permissions
 * @param scope - The scope of the permission
 * @param action - The action of the permission
 * @returns The permission
 */
export function getPermission(
	permissions: Permission<unknown>[],
	scope: string,
	action: string,
): Permission<unknown> {
	return mergekit([...permissions], {
		appendArrays: true,
		dedupArrays: true,

		onlyObjectWithKeyValues: [
			{ key: 'scope', value: scope },
			{ key: 'action', value: action },
		],
	});
}
