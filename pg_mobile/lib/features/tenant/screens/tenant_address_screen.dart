import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/widgets/app_shell.dart';
import '../../../models/pg.dart';
import '../../../providers/app_providers.dart';
import '../../../router/app_router.dart';

class _DeliveryApp {
  const _DeliveryApp({
    required this.name,
    required this.description,
    required this.url,
    required this.fallback,
  });

  final String name;
  final String description;
  final String url;
  final String fallback;
}

const _apps = [
  _DeliveryApp(
    name: 'Zomato',
    description: 'Copy your saved address from Zomato profile',
    url: 'zomato://',
    fallback: 'https://www.zomato.com',
  ),
  _DeliveryApp(
    name: 'Swiggy',
    description: 'Open Swiggy and copy address from account settings',
    url: 'swiggy://',
    fallback: 'https://www.swiggy.com',
  ),
  _DeliveryApp(
    name: 'Zepto',
    description: 'Copy delivery address from Zepto app',
    url: 'zepto://',
    fallback: 'https://www.zeptonow.com',
  ),
  _DeliveryApp(
    name: 'Amazon',
    description: 'Use your Amazon delivery address as reference',
    url: 'amazon://',
    fallback: 'https://www.amazon.in',
  ),
];

class TenantAddressScreen extends ConsumerWidget {
  const TenantAddressScreen({super.key});

  Future<void> _openApp(_DeliveryApp app) async {
    final deepLink = Uri.parse(app.url);
    if (await canLaunchUrl(deepLink)) {
      await launchUrl(deepLink);
    } else {
      await launchUrl(Uri.parse(app.fallback));
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(profileProvider).valueOrNull;
    final String resolvedPgId = profile?.pgId ?? ref.watch(pgIdProvider);

    return AppShell(
      title: 'Address',
      body: FutureBuilder<PgConfig>(
        future: ref.read(pgConfigServiceProvider).load(resolvedPgId),
        builder: (context, snapshot) {
          final config = snapshot.data;
          final address = config?.address ?? profile?.pg?.address ?? '';

          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              if (address.isNotEmpty) ...[
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'PG address',
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const SizedBox(height: 8),
                        SelectableText(address),
                        const SizedBox(height: 12),
                        FilledButton.tonalIcon(
                          onPressed: () {
                            Clipboard.setData(ClipboardData(text: address));
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Address copied')),
                            );
                          },
                          icon: const Icon(Icons.copy),
                          label: const Text('Copy address'),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
              ],
              Text(
                'Share your PG address with friends and delivery apps. Open an app below, copy your saved address, and paste it wherever you need.',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
              ),
              const SizedBox(height: 16),
              ..._apps.map(
                (app) => Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          app.name,
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          app.description,
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                        const SizedBox(height: 12),
                        FilledButton.tonal(
                          onPressed: () => _openApp(app),
                          child: Text('Open ${app.name}'),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
