import type { CommandClass } from './CommandClass';
import { DisconnectCommand } from './connection/DisconnectCommand';
import { SetConnectionCommand } from './connection/SetConnectionCommand';
import { RedoCommand } from './editor/RedoCommand';
import { UndoCommand } from './editor/UndoCommand';
import { AddGroupCommand } from './group/AddGroupCommand';
import { GroupNodesCommand } from './group/GroupNodesCommand';
import { RemoveGroupCommand } from './group/RemoveGroupCommand';
import { RenameGroupCommand } from './group/RenameGroupCommand';
import { AddNodeCommand } from './node/AddNodeCommand';
import { MoveNodeCommand } from './node/MoveNodeCommand';
import { MoveNodesCommand } from './node/MoveNodesCommand';
import { RemoveNodeCommand } from './node/RemoveNodeCommand';
import { SetConstantNodeValueCommand } from './node/SetConstantNodeValueCommand';
import { SetGroupNodeTargetGroupIdCommand } from './node/SetGroupNodeTargetGroupIdCommand';

export const commandClasses = [
	RedoCommand,
	UndoCommand,
	AddNodeCommand,
	AddGroupCommand,
	MoveNodeCommand,
	MoveNodesCommand,
	DisconnectCommand,
	GroupNodesCommand,
	RemoveNodeCommand,
	RemoveGroupCommand,
	RenameGroupCommand,
	SetConnectionCommand,
	SetConstantNodeValueCommand,
	SetGroupNodeTargetGroupIdCommand,
] as CommandClass[];
