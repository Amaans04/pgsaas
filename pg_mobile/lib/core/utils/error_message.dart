import 'package:flutter/foundation.dart';

import 'app_exception.dart';
import 'app_strings.dart';

/// Safe error text for SnackBars and dialogs — avoids leaking internals in release.
String userFacingError(Object error) {
  if (error is AppException) return error.message;
  if (kDebugMode) return error.toString();
  return AppStrings.genericError;
}
